"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentList = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useCommentStore_1 = require("../../stores/useCommentStore");
const Comment_1 = require("./Comment");
const CreateComment_1 = tslib_1.__importDefault(require("./CreateComment/CreateComment"));
const CommentList = ({ post, currentUser }) => {
    const { comments, getAllComments } = (0, useCommentStore_1.useCommentStore)();
    (0, react_1.useEffect)(() => {
        getAllComments(post);
    }, [post]);
    return (react_1.default.createElement("div", { className: "bg-gray-100 rounded-lg p-4" },
        react_1.default.createElement("h3", { className: "text-lg font-bold mb-2" }, "Comments"),
        react_1.default.createElement(CreateComment_1.default, { post: post, currentUser: currentUser }),
        comments.map((comment) => {
            return (react_1.default.createElement(Comment_1.Comment, { key: comment.id, comment: comment, post: post, currentUser: currentUser }));
        })));
};
exports.CommentList = CommentList;
//# sourceMappingURL=CommentList.js.map