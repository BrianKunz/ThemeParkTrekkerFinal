import { __awaiter } from "tslib";
import { useState } from "react";
import { useCommentStore } from "../../../stores/useCommentStore";
import { v4 as uuidv4 } from "uuid";
export function useCreateComment(post, currentUser) {
    const [commentFormInputs, setCommentFormInputs] = useState({
        time: new Date(),
        body: "",
    });
    const [loadingComments, setLoadingComments] = useState(false);
    const { createNewComment } = useCommentStore();
    const handleCommentFormChange = ({ target: { name, value }, }) => {
        setCommentFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleCommentSubmit = () => __awaiter(this, void 0, void 0, function* () {
        if (loadingComments) {
            return;
        }
        try {
            setLoadingComments(true);
            const commentId = uuidv4();
            yield createNewComment({
                id: commentId,
                time: commentFormInputs.time,
                body: commentFormInputs.body,
                post: post,
                user: currentUser,
            }, post);
            setCommentFormInputs({
                time: new Date(),
                body: "",
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoadingComments(false);
        }
    });
    return {
        handleCommentFormChange,
        handleCommentSubmit,
        commentFormInputs,
        setCommentFormInputs,
        loadingComments,
    };
}
//# sourceMappingURL=useCreateComment.js.map