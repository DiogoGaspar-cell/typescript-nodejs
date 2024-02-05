export class PostModel {
  id!: string;
  title!: string;
  content!: string | null;
  published!: boolean;
  authorId!: string;
  boardId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
