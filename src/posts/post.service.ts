import { CreatePostDto, GetPostsDto, UpdatePostDto } from "./dto/post.dto";
import { PostCollection } from "./model/collection/post.collection";
import { PostModel } from "./model/post.model";
import { IPostRepository } from "./post.repository";

export interface IPostService {
  getById(id: string): Promise<PostModel>;
  getAll(dto: GetPostsDto): Promise<PostCollection>;
  create(data: CreatePostDto): Promise<PostModel>;
  update(id: string, data: UpdatePostDto): Promise<PostModel>;
  delete(id: string): Promise<void>;
}

export class PostService implements IPostService {
  constructor(private postRepository: IPostRepository) {}

  getById(id: string): Promise<PostModel> {
    return this.postRepository.findByIdOrThrow(id);
  }

  getAll(dto: GetPostsDto): Promise<PostCollection> {
    return this.postRepository.find(dto);
  }

  create(data: CreatePostDto): Promise<PostModel> {
    return this.postRepository.create(data);
  }

  update(
    id: string,
    data: Partial<Pick<CreatePostDto, "title" | "content" | "published">>
  ): Promise<PostModel> {
    return this.postRepository.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.postRepository.delete(id);
  }
}
