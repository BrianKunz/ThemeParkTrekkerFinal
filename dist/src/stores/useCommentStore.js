"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommentStore = void 0;
const zustand_1 = require("zustand");
const commentService_1 = require("../services/commentService");
const userService_1 = require("../services/userService");
exports.useCommentStore = (0, zustand_1.create)((set, get) => ({
    comments: [],
    user: null,
    getAllComments: async (post) => {
        try {
            const comments = await commentService_1.commentService.getAll();
            const filteredComments = comments.filter((comment) => {
                return comment.post?.id === post?.id;
            });
            set({ comments: filteredComments });
        }
        catch (error) {
            console.error(error);
        }
    },
    createNewComment: async (comment, post) => {
        try {
            const { getAllComments } = get();
            const user = await userService_1.userService.getCurrentUser();
            await commentService_1.commentService.create({
                ...comment,
                user,
                post,
            });
            await getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    },
    updateComment: async (comment, post) => {
        try {
            const { getAllComments } = get();
            await commentService_1.commentService.update(comment.id, comment);
            await getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    },
    deleteComment: async (id, post) => {
        try {
            const { getAllComments } = get();
            await commentService_1.commentService.delete(id);
            await getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    },
}));
//# sourceMappingURL=useCommentStore.js.map