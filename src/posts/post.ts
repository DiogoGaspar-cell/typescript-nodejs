import { PrismaClient } from "@prisma/client";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
import { PostRouter } from "./post.router";

export const Posts = (prisma: PrismaClient) => {
  const postRepository = new PostRepository(prisma);
  const postService = new PostService(postRepository);

  const posts = PostRouter(postService);

  return posts;
};
