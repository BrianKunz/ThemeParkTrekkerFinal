import { __awaiter } from "tslib";
import { create } from "zustand";
import { postService } from "../services/postService";
import { userService } from "../services/userService";
export const usePostStore = create((set, get) => ({
    posts: [],
    user: userService.getCurrentUser(),
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield postService.getAll();
            set({ posts });
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOnePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield postService.getOne(id);
            set({ post });
            return post;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }),
    createNewPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllPosts, user } = get();
            if (user) {
                yield postService.create(Object.assign(Object.assign({}, post), { user }));
                yield getAllPosts();
            }
        }
        catch (error) {
            console.error(error);
        }
    }),
    updatePost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postService.update(post.id, post);
            yield get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    }),
    deletePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postService.delete(id);
            yield get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=usePostStore.js.map