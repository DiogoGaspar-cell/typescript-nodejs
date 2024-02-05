import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import postRouter from "./post.router";

export const posts = (app: Hono, prisma: PrismaClient) => {
  const postRepository = new PostRepository(prisma);
  const postService = new PostService(postRepository);
  const postController = new PostController(postService);

  const posts = postRouter(postController);

  app.route("/posts", posts);
};
