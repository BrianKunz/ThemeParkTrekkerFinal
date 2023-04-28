import React from "react";
import { Post } from "../../entities/Post.entity";
import { User } from "../../entities/User.entity";
interface Props {
    comment: {
        id: string;
        time: Date;
        body: string;
    };
    post: Post;
    currentUser: User;
}
export declare const Comment: React.FC<Props>;
export {};
