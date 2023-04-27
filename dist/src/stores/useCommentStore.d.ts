import { Post } from "../entities/Post.entity";
import { Comment } from "../entities/Comment.entity";
import { User } from "../entities/User.entity";
interface CommentStore {
    comments: Comment[];
    user: User | null;
    getAllComments: (post: Post) => Promise<void>;
    createNewComment: (comment: Comment, post: Post) => Promise<void>;
    updateComment: (comment: Comment, post: Post) => Promise<void>;
    deleteComment: (id: string, post: Post) => Promise<void>;
}
export declare const useCommentStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CommentStore>>;
export {};
