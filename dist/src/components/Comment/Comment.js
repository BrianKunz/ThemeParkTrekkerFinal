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
    const handleChange = ({ target: { value }, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log({ value });
        if (loading || !post) {
            return;
        }
        setLoading(true);
        try {
            yield updateComment({
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
    });
    const handleCommentDelete = () => {
        if (!id) {
            return;
        }
        deleteComment(id, post);
    };
    return (react_1.default.createElement("div", { className: "my-4 p-4 border rounded-lg" },
        react_1.default.createElement(CreateComment_1.default, { post: post, currentUser: currentUser }),
        react_1.default.createElement("div", { className: "my-2" }, time.toLocaleString()),
        react_1.default.createElement("div", { className: "mb-2" },
            react_1.default.createElement("input", { type: "text", value: body, onChange: handleChange, className: "border border-gray-300 rounded-lg p-2" })),
        react_1.default.createElement("button", { disabled: loading, onClick: handleCommentDelete, className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" }, "Delete")));
};
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map