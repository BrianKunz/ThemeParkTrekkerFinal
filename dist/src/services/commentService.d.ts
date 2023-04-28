import { Comment } from "../entities/Comment.entity";
export declare const commentService: {
    getAll: () => Promise<Comment[]>;
    getOne: (id: string) => Promise<Comment>;
    create: (comment: Comment) => Promise<Comment>;
    update: (id: string, comment: Comment) => Promise<Comment>;
    delete: (id: string) => Promise<void>;
};
