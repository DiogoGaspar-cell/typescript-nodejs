import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreatePostValidation,
  GetAllPostsValidation,
  IdValidation,
  UpdatePostValidation,
} from "./post.validation";
import { IPostService } from "./post.service";
import { CreatePostDto, GetPostsDto, UpdatePostDto } from "./dto/post.dto";

const getPostById = (app: Hono, postService: IPostService) =>
  app.get("/:id", zValidator("param", IdValidation), async (c) => {
    const { id } = c.req.valid("param");

    const post = await postService.getById(id);

    return c.json(post);
  });

const getAllPosts = (app: Hono, postService: IPostService) =>
  app.get("/", zValidator("query", GetAllPostsValidation), async (c) => {
    const {
      sortOrder = "DESC",
      sortBy = "createdAt",
      page = "1",
      perPage = "20",
      q,
      authorId,
      boardId,
      start,
      end,
      isPublished,
    } = c.req.valid("query");

    const collection = await postService.getAll({
      sortOrder,
      sortBy,
      page: Number(page),
      perPage: Number(perPage),
      q,
      authorId,
      boardId,
      ...(start && { start: new Date(start) }),
      ...(end && { end: new Date(end) }),
      ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
    } as GetPostsDto);

    return c.json(collection);
  });

const createPost = (app: Hono, postService: IPostService) =>
  app.post("/", zValidator("json", CreatePostValidation), async (c) => {
    const { title, content, published, boardId, authorId } =
      c.req.valid("json");

    const post = await postService.create({
      title,
      content,
      ...(published !== undefined && { published }),
      authorId,
      boardId,
    } as CreatePostDto);

    return c.json(post, 201);
  });

const updatePost = (app: Hono, postService: IPostService) =>
  app.put(
    "/:id",
    zValidator("param", IdValidation),
    zValidator("json", UpdatePostValidation),
    async (c) => {
      const { id } = c.req.valid("param");
      const { title, content, published } = c.req.valid("json");

      const updatedPost = await postService.update(id, {
        title,
        content,
        published,
      } as UpdatePostDto);

      return c.json(updatedPost, 202);
    }
  );

const deletePost = (app: Hono, postService: IPostService) =>
  app.delete("/:id", zValidator("param", IdValidation), async (c) => {
    const { id } = c.req.valid("param");

    await postService.delete(id);

    return c.text(`Post with id ${id} was deleted`, 202);
  });

export const PostRouter = (service: IPostService): Hono => {
  const posts = new Hono();

  getPostById(posts, service);
  getAllPosts(posts, service);
  createPost(posts, service);
  updatePost(posts, service);
  deletePost(posts, service);

  return posts;
};
