import React from "react";
import { Post } from "../../entities/Post.entity";
import { User } from "../../entities/User.entity";
interface Props {
    post: Post;
    currentUser: User;
}
export declare const CommentList: React.FC<Props>;
export {};
