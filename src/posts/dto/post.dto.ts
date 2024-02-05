import { Prisma } from "@prisma/client";

export enum PostsOrderBy {
  CREATED_AT = "createdAt",
}

export type PostsWhereDto = {
  authorId?: string;
  boardId?: string;
  start?: Date;
  end?: Date;
  isPublished?: boolean;
  title?: string;
  content?: string;
};

export type GetPostsDto = PostsWhereDto & {
  page: number;
  perPage: number;
  sortOrder: Prisma.SortOrder;
  sortBy: PostsOrderBy;
};

export type CreatePostDto = {
  title: string;
  content: string;
  published?: boolean;
  authorId: string;
  boardId: string;
};

export type UpdatePostDto = Partial<
  Pick<CreatePostDto, "title" | "content" | "published">
>;
