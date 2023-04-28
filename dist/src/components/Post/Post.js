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
        async function fetchPost() {
            await getOnePost(id);
            setLoading(false);
        }
        fetchPost();
    }, [getOnePost, id]);
    if (loading) {
        return react_1.default.createElement("div", null, "Loading...");
    }
    if (!post) {
        return react_1.default.createElement("div", null, "No post found");
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("h1", null, post.title),
        react_1.default.createElement("img", { src: post.image }),
        react_1.default.createElement("p", null, post.description)));
};
exports.default = Post;
//# sourceMappingURL=Post.js.map