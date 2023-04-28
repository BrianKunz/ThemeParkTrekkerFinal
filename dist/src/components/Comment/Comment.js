"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useCommentStore_1 = require("../../stores/useCommentStore");
const CreateComment_1 = tslib_1.__importDefault(require("./CreateComment/CreateComment"));
const Comment = ({ comment: { id, time, body }, post, currentUser, }) => {
    const { updateComment, deleteComment } = (0, useCommentStore_1.useCommentStore)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleChange = async ({ target: { value }, }) => {
        console.log({ value });
        if (loading || !post) {
            return;
        }
        setLoading(true);
        try {
            await updateComment({
                id,
                time,
                body: value,
                post: post,
                user: currentUser,
            }, post);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCommentDelete = () => {
        if (!id) {
            return;
        }
        deleteComment(id, post);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(CreateComment_1.default, { post: post, currentUser: currentUser }),
        react_1.default.createElement("input", { type: "text", value: body, onChange: handleChange }),
        react_1.default.createElement("button", { disabled: loading, onClick: handleCommentDelete }, "Delete")));
};
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map