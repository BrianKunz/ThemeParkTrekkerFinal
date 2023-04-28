import { Post } from "../../../entities/Post.entity";
import { User } from "../../../entities/User.entity";
interface FormInputs {
    time: Date;
    body: string;
}
export declare function useCreateComment(post: Post, currentUser: User): {
    handleCommentFormChange: import("react").ChangeEventHandler<HTMLTextAreaElement>;
    handleCommentSubmit: () => Promise<void>;
    commentFormInputs: FormInputs;
    setCommentFormInputs: import("react").Dispatch<import("react").SetStateAction<FormInputs>>;
    loadingComments: boolean;
};
export {};
