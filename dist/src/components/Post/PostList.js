"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const usePostStore_1 = require("../../stores/usePostStore");
const CreatePost_1 = tslib_1.__importDefault(require("./CreatePost/CreatePost"));
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
function PostList() {
    const { posts, getAllPosts } = (0, usePostStore_1.usePostStore)();
    (0, react_1.useEffect)(() => {
        getAllPosts();
    }, []);
    return (React.createElement("div", null,
        React.createElement(NavBar_1.default, null),
        React.createElement("h1", null, "Post List"),
        React.createElement(CreatePost_1.default, null),
        posts &&
            posts.map((post) => (React.createElement("div", { key: post.id },
                React.createElement("h2", null, post.title),
                React.createElement("p", null, post.description))))));
}
exports.default = PostList;
//# sourceMappingURL=PostList.js.map