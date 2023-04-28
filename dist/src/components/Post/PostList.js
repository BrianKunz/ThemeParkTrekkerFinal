"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const usePostStore_1 = require("../../stores/usePostStore");
const CreatePost_1 = tslib_1.__importDefault(require("./CreatePost/CreatePost"));
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
function PostList() {
    const { posts, getAllPosts } = (0, usePostStore_1.usePostStore)();
    (0, react_1.useEffect)(() => {
        getAllPosts();
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("h1", null, "Post List"),
        react_1.default.createElement(CreatePost_1.default, null),
        posts &&
            posts.map((post) => (react_1.default.createElement("div", { key: post.id },
                react_1.default.createElement("h2", null, post.title),
                react_1.default.createElement("p", null, post.description))))));
}
exports.default = PostList;
//# sourceMappingURL=PostList.js.map