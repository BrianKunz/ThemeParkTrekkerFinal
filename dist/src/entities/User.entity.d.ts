import { Trip } from "./Trip.entity";
import { Post } from "./Post.entity";
import { Comment } from "./Comment.entity";
export declare class User {
    id?: string;
    username: string;
    email?: string;
    password?: string;
    admin?: boolean;
    trips?: Trip[];
    posts?: Post[];
    comments?: Comment[];
}
