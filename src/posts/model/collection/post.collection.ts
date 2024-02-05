import { Posts } from "@prisma/client";
import { PostMapper } from "../../dto/mapper/post.mapper";
import { PostModel } from "../post.model";

export class PostCollection {
  posts: PostModel[];
  count: number;

  constructor(dbData: Posts[], count: number) {
    this.posts = dbData.map((post) => PostMapper.toDomain(post));
    this.count = count;
  }
}
