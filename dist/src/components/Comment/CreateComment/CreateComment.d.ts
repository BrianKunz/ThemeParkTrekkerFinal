import { Post } from "../../../entities/Post.entity";
import { User } from "../../../entities/User.entity";
interface Props {
    post: Post;
    currentUser: User;
}
export default function CreateComment({ post, currentUser }: Props): JSX.Element;
export {};
