import { Posts } from "@prisma/client";
import { PostModel } from "../../model/post.model";

export class PostMapper {
  constructor() {}

  static toDomain(dbData: Posts): PostModel {
    return {
      id: dbData.id,
      title: dbData.title,
      content: dbData.content,
      published: dbData.published,
      authorId: dbData.authorId,
      boardId: dbData.boardId,
      createdAt: dbData.createdAt,
      updatedAt: dbData.updatedAt,
    };
  }
}
