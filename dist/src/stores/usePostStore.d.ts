import { User } from "../entities/User.entity";
import { Post } from "../entities/Post.entity";
interface PostStore {
    posts: Post[];
    user: User | null;
    post?: Post | null;
    getAllPosts: () => Promise<void>;
    getOnePost: (id: string) => Promise<void | Post>;
    createNewPost: (post: Post) => Promise<void>;
    updatePost: (post: Post) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}
export declare const usePostStore: import("zustand").UseBoundStore<import("zustand").StoreApi<PostStore>>;
export {};
