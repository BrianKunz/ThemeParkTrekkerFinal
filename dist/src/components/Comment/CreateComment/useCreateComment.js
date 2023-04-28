"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateComment = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const useCommentStore_1 = require("../../../stores/useCommentStore");
const uuid_1 = require("uuid");
function useCreateComment(post, currentUser) {
    const [commentFormInputs, setCommentFormInputs] = (0, react_1.useState)({
        time: new Date(),
        body: "",
    });
    const [loadingComments, setLoadingComments] = (0, react_1.useState)(false);
    const { createNewComment } = (0, useCommentStore_1.useCommentStore)();
    const handleCommentFormChange = ({ target: { name, value } }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        setCommentFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    });
    const handleCommentSubmit = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (loadingComments) {
            return;
        }
        try {
            setLoadingComments(true);
            const commentId = (0, uuid_1.v4)();
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
exports.useCreateComment = useCreateComment;
//# sourceMappingURL=useCreateComment.js.map