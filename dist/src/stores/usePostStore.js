"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostStore = void 0;
const zustand_1 = require("zustand");
const postService_1 = require("../services/postService");
const userService_1 = require("../services/userService");
exports.usePostStore = (0, zustand_1.create)((set, get) => ({
    posts: [],
    user: null,
    getAllPosts: async () => {
        try {
            const posts = await postService_1.postService.getAll();
            set({ posts });
        }
        catch (error) {
            console.error(error);
        }
    },
    getOnePost: async (id) => {
        try {
            const post = await postService_1.postService.getOne(id);
            set({ post });
            return post;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    },
    createNewPost: async (post) => {
        try {
            const { getAllPosts } = get();
            const user = await userService_1.userService.getCurrentUser();
            if (user) {
                await postService_1.postService.create({ ...post, user });
                await getAllPosts();
            }
        }
        catch (error) {
            console.error(error);
        }
    },
    updatePost: async (post) => {
        try {
            await postService_1.postService.update(post.id, post);
            await get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    },
    deletePost: async (id) => {
        try {
            await postService_1.postService.delete(id);
            await get().getAllPosts();
        }
        catch (error) {
            console.error(error);
        }
    },
}));
//# sourceMappingURL=usePostStore.js.map