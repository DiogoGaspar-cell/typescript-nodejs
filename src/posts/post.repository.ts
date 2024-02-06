import { Prisma, PrismaClient } from "@prisma/client";
import { PostModel } from "./model/post.model";
import { PostCollection } from "./model/collection/post.collection";
import {
  CreatePostDto,
  GetPostsDto,
  PostsWhereDto,
  UpdatePostDto,
} from "./dto/post.dto";
import { PostMapper } from "./dto/mapper/post.mapper";

export interface IPostRepository {
  findByIdOrThrow(id: string): Promise<PostModel>;
  find(data: GetPostsDto): Promise<PostCollection>;
  create(data: CreatePostDto): Promise<PostModel>;
  update(id: string, data: UpdatePostDto): Promise<PostModel>;
  delete(id: string): Promise<void>;
}

export class PostRepository implements IPostRepository {
  constructor(private prisma: PrismaClient) {}

  async findByIdOrThrow(id: string): Promise<PostModel> {
    const post = await this.prisma.posts.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return PostMapper.toDomain(post);
  }

  async find(data: GetPostsDto): Promise<PostCollection> {
    const {
      sortOrder,
      sortBy,
      page,
      perPage,
      q,
      authorId,
      boardId,
      start,
      end,
      isPublished,
    } = data;

    const skip = Math.max((page - 1) * perPage, 0);

    const orderBy: Prisma.PostsOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const where = this.buildWhere({
      q,
      authorId,
      boardId,
      start,
      end,
      isPublished,
    });

    const postsPromise = this.prisma.posts.findMany({
      where,
      orderBy,
      skip,
      take: perPage,
    });

    const countPromise = this.prisma.posts.count({
      where,
    });

    const [posts, count] = await Promise.all([postsPromise, countPromise]);

    return new PostCollection(posts, count);
  }

  async create(data: CreatePostDto): Promise<PostModel> {
    const { title, content, published = false, authorId, boardId } = data;

    const newPost = await this.prisma.posts.create({
      data: {
        title,
        content,
        published,
        authorId,
        boardId,
      },
    });

    return PostMapper.toDomain(newPost);
  }

  async update(id: string, data: UpdatePostDto): Promise<PostModel> {
    const { title, content, published } = data;

    const post = await this.prisma.posts.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published }),
      },
    });

    return PostMapper.toDomain(post);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.posts.delete({
      where: {
        id,
      },
    });
  }

  private buildWhere(data: PostsWhereDto): Prisma.PostsWhereInput {
    const { q, authorId, boardId, start, end, isPublished } = data;

    let where: Prisma.PostsWhereInput = {};
    let createdAt: Prisma.DateTimeFilter = {};

    if (q !== undefined) {
      where = {
        ...where,
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (start !== undefined) {
      createdAt = {
        ...createdAt,
        gte: start,
      };
    }

    if (end !== undefined) {
      createdAt = {
        ...createdAt,
        lte: end,
      };
    }

    return {
      ...where,
      ...(authorId !== undefined && { authorId }),
      ...(boardId !== undefined && { boardId }),
      ...(isPublished !== undefined && { published: isPublished }),
    };
  }
}
