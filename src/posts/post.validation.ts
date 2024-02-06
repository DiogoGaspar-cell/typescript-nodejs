import { z } from "zod";
import { UUIDValidation, buildGetValidation } from "../utils/validation";
import { PostsOrderBy } from "./dto/post.dto";

export const GetPostByIdValidation = z.object({
  id: UUIDValidation,
});

export const GetAllPostsValidation = buildGetValidation(
  {
    sortOrder: { default: "DESC" },
    sortBy: { options: PostsOrderBy, default: PostsOrderBy.CREATED_AT },
    q: { max: 50 },
  },
  {
    authorId: UUIDValidation.optional(),
    boardId: UUIDValidation.optional(),
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
    isPublished: z.boolean().default(true).optional(),
  }
);

export const CreatePostValidation = z.object({
  title: z.string().max(50),
  content: z.string().max(255),
  published: z.boolean().optional(),
  authorId: UUIDValidation,
  boardId: UUIDValidation,
});
