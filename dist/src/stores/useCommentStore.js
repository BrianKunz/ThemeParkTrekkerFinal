"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommentStore = void 0;
const tslib_1 = require("tslib");
const zustand_1 = require("zustand");
const commentService_1 = require("../services/commentService");
const userService_1 = require("../services/userService");
exports.useCommentStore = (0, zustand_1.create)((set, get) => ({
    comments: [],
    user: null,
    getAllComments: (post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield commentService_1.commentService.getAll();
            const filteredComments = comments.filter((comment) => {
                var _a;
                return ((_a = comment.post) === null || _a === void 0 ? void 0 : _a.id) === (post === null || post === void 0 ? void 0 : post.id);
            });
            set({ comments: filteredComments });
        }
        catch (error) {
            console.error(error);
        }
    }),
    createNewComment: (comment, post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            const user = yield userService_1.userService.getCurrentUser();
            yield commentService_1.commentService.create(Object.assign(Object.assign({}, comment), { user,
                post }));
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
    updateComment: (comment, post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            yield commentService_1.commentService.update(comment.id, comment);
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
    deleteComment: (id, post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            yield commentService_1.commentService.delete(id);
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=useCommentStore.js.map