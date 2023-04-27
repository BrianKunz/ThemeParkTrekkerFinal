import { __awaiter } from "tslib";
import { create } from "zustand";
import { commentService } from "../services/commentService";
import { userService } from "../services/userService";
export const useCommentStore = create((set, get) => ({
    comments: [],
    user: userService.getCurrentUser() || { id: "", username: "", email: "" },
    getAllComments: (post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield commentService.getAll();
            const filteredComments = comments.filter((comment) => {
                //@ts-ignore
                return comment.post === (post === null || post === void 0 ? void 0 : post.id); // Use type guard to check if post is undefined
            });
            set({ comments: filteredComments });
        }
        catch (error) {
            console.error(error);
        }
    }),
    createNewComment: (comment, post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            const { user } = get();
            yield commentService.create(Object.assign(Object.assign({}, comment), { user,
                post }));
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
    updateComment: (comment, post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            yield commentService.update(comment.id, comment);
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
    deleteComment: (id, post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllComments } = get();
            yield commentService.delete(id);
            yield getAllComments(post);
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=useCommentStore.js.map