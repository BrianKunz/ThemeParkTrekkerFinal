"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const usePostStore_1 = require("../../stores/usePostStore");
const CreatePost_1 = tslib_1.__importDefault(require("./CreatePost/CreatePost"));
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
const react_router_dom_1 = require("react-router-dom");
function PostList() {
    const { posts, getAllPosts } = (0, usePostStore_1.usePostStore)();
    (0, react_1.useEffect)(() => {
        getAllPosts();
    }, []);
    return (React.createElement("div", { className: "bg-gray-200 min-h-screen" },
        React.createElement(NavBar_1.default, null),
        React.createElement("div", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "px-4 py-6 sm:px-0" },
                React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-8" }, "Post List"),
                React.createElement(CreatePost_1.default, null),
                posts &&
                    posts.map((post) => (React.createElement("div", { key: post.id, className: "bg-white rounded-md shadow-md overflow-hidden mb-8" },
                        React.createElement(react_router_dom_1.Link, { to: `/posts/${post.id}` },
                            React.createElement("img", { src: post.image, alt: post.title, className: "w-full h-64 object-cover" })),
                        React.createElement("div", { className: "px-4 py-4" },
                            React.createElement(react_router_dom_1.Link, { to: `/posts/${post.id}` },
                                React.createElement("h2", { className: "text-xl font-bold text-gray-900 mb-2" }, post.title)),
                            React.createElement("p", { className: "text-gray-700" }, post.description)))))))));
}
exports.default = PostList;
//# sourceMappingURL=PostList.js.map