"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const usePostStore_1 = require("../../stores/usePostStore");
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
const Post = () => {
    const { id = "" } = (0, react_router_dom_1.useParams)();
    const { getOnePost, post } = (0, usePostStore_1.usePostStore)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        function fetchPost() {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield getOnePost(id);
                setLoading(false);
            });
        }
        fetchPost();
    }, [getOnePost, id]);
    if (loading) {
        return react_1.default.createElement("div", { className: "text-center" }, "Loading...");
    }
    if (!post) {
        return react_1.default.createElement("div", { className: "text-center" }, "No post found");
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" },
            react_1.default.createElement("h1", { className: "text-3xl font-bold mb-4" }, post.title),
            react_1.default.createElement("img", { src: post.image, alt: post.title, className: "max-w-2xl mb-4" }),
            react_1.default.createElement("p", { className: "mb-4" }, new Date(post.created).toLocaleString()),
            react_1.default.createElement("p", null, post.description))));
};
exports.default = Post;
//# sourceMappingURL=Post.js.map