import { User } from "./User.entity";
import { Comment } from "./Comment.entity";
export declare class Post {
    id: string;
    title: string;
    image?: string;
    description: string;
    created: Date;
    user: User | null;
    constructor(title: string, image: string | undefined, description: string, created: Date, user: User | null);
    comments: Comment[];
}
