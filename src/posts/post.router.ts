import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { PostController } from "./post.controller";
import {
  CreatePostValidation,
  GetAllPostsValidation,
  GetPostByIdValidation,
} from "./post.validation";

const getPostById = (app: Hono, controller: PostController) =>
  app.get(
    "/:id",
    zValidator("param", GetPostByIdValidation),
    async (c) => await controller.getById(c)
  );

const getAllPosts = (app: Hono, controller: PostController) =>
  app.get(
    "/",
    zValidator("query", GetAllPostsValidation),
    async (c) => await controller.getAll(c)
  );

const createPost = (app: Hono, controller: PostController) =>
  app.post(
    "/",
    zValidator("json", CreatePostValidation),
    async (c) => await controller.create(c)
  );

const updatePost = (app: Hono, controller: PostController) =>
  app.patch("/:id", (c) => c.text("Not yet implemented!"));

const deletePost = (app: Hono, controller: PostController) =>
  app.delete("/:id", (c) => c.text("Not yet implemented!"));

export default (controller: PostController): Hono => {
  const posts = new Hono();

  getPostById(posts, controller);
  getAllPosts(posts, controller);
  createPost(posts, controller);
  updatePost(posts, controller);
  deletePost(posts, controller);

  return posts;
};
