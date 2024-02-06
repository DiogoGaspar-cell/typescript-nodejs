import { z } from "zod";
import {
  BooleanQueryValidationEnum,
  PerPageQueryValidationEnum,
  SortOrderQueryValidationEnum,
  UUIDValidation,
} from "../utils/validation";
import { PostsOrderBy } from "./dto/post.dto";

export const IdValidation = z.object({
  id: UUIDValidation,
});

export const GetAllPostsValidation = z.object({
  sortBy: z.nativeEnum(PostsOrderBy).optional(),
  authorId: UUIDValidation.optional(),
  boardId: UUIDValidation.optional(),
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
  isPublished: z.enum(BooleanQueryValidationEnum).optional(),
  q: z.string().max(50).optional(),
  page: z.string().regex(/^[1-9]\d*$/),
  perPage: z.enum(PerPageQueryValidationEnum),
  sortOrder: z.enum(SortOrderQueryValidationEnum).optional(),
});

export const CreatePostValidation = z.object({
  title: z.string().max(50),
  content: z.string().max(255),
  published: z.boolean().optional(),
  authorId: UUIDValidation,
  boardId: UUIDValidation,
});

export const UpdatePostValidation = z.object({
  title: z.string().max(50).optional(),
  content: z.string().max(255).optional(),
  published: z.boolean().optional(),
});
