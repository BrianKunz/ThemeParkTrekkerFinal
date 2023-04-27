import { Post } from "../entities/Post.entity";
export declare const postService: {
    getAll: () => Promise<Post[]>;
    getOne: (id: string) => Promise<Post>;
    create: (post: Post) => Promise<Post>;
    update: (id: string, post: Post) => Promise<Post>;
    delete: (id: string) => Promise<void>;
};
