import { Context } from "hono";
import { IPostService } from "./post.service";
import { CreatePostDto, GetPostsDto } from "./dto/post.dto";

export class PostController {
  constructor(private postService: IPostService) {}

  async getById(c: Context) {
    const { id } = c.req.param();

    const post = await this.postService.getById(id);

    return c.json(post);
  }

  async getAll(c: Context) {
    const {
      sortOrder,
      sortBy,
      page,
      perPage,
      title,
      content,
      authorId,
      boardId,
      start,
      end,
      isPublished,
    } = c.req.query();

    const collection = await this.postService.getAll({
      sortOrder,
      sortBy,
      page: Number(page),
      perPage: Number(perPage),
      title,
      content,
      authorId,
      boardId,
      start,
      end,
      isPublished,
    } as unknown as GetPostsDto);

    return c.json(collection);
  }

  async create(c: Context) {
    const data = await c.req.json();

    const post = await this.postService.create(
      data as unknown as CreatePostDto
    );

    return c.json(post);
  }
}