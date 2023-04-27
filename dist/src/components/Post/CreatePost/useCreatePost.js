import { __awaiter } from "tslib";
import { useState } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "../../../stores/useUserStore";
export function useCreatePost() {
    const [postFormInputs, setPostFormInputs] = useState({
        title: "",
        image: "",
        description: "",
        created: new Date(),
        comments: [],
    });
    const [loadingPosts, setLoadingPosts] = useState(false);
    const { createNewPost } = usePostStore();
    const { currentUser } = useUserStore();
    const handlePostFormChange = ({ target: { name, value }, }) => {
        setPostFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handlePostSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (loadingPosts) {
            return;
        }
        try {
            setLoadingPosts(true);
            const postId = uuidv4();
            yield createNewPost({
                id: postId,
                created: postFormInputs.created,
                title: postFormInputs.title,
                image: postFormInputs.image,
                description: postFormInputs.description,
                comments: [],
                user: currentUser,
            });
            setPostFormInputs({
                created: new Date(),
                title: "",
                image: "",
                description: "",
                comments: [],
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoadingPosts(false);
        }
    });
    return {
        handlePostSubmit,
        handlePostFormChange,
        postFormInputs,
        setPostFormInputs,
        loadingPosts,
    };
}
//# sourceMappingURL=useCreatePost.js.map