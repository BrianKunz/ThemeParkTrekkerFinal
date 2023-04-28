import { Post } from "./Post.entity";
import { User } from "./User.entity";
export declare class Comment {
    id: string;
    time: Date;
    body: string;
    post: Post;
    user: User | null;
}
