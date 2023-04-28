"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostStore = void 0;
const tslib_1 = require("tslib");
const zustand_1 = require("zustand");
const postService_1 = require("../services/postService");
const userService_1 = require("../services/userService");
exports.usePostStore = (0, zustand_1.create)((set, get) => ({
    posts: [],
    user: userService_1.userService.getCurrentUser(),
    getAllPosts: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield postService_1.postService.getAll();
            set({ posts });
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOnePost: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield postService_1.postService.getOne(id);
            set({ post });
            return post;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }),
    createNewPost: (post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllPosts, user } = get();
            if (user) {
                yield postService_1.postService.create(Object.assign(Object.assign({}, post), { user }));
                yield getAllPosts();
            }
        }
        catch (error) {
            console.error(error);
        }
    }),
    updatePost: (post) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postService_1.postService.update(post.id, post);
            yield get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    }),
    deletePost: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postService_1.postService.delete(id);
            yield get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=usePostStore.js.map