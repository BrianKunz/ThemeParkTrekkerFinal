"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreatePost = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const usePostStore_1 = require("../../../stores/usePostStore");
const uuid_1 = require("uuid");
const useUserStore_1 = require("../../../stores/useUserStore");
function useCreatePost() {
    const [postFormInputs, setPostFormInputs] = (0, react_1.useState)({
        title: "",
        image: "",
        description: "",
        created: new Date(),
        comments: [],
    });
    const [loadingPosts, setLoadingPosts] = (0, react_1.useState)(false);
    const { createNewPost } = (0, usePostStore_1.usePostStore)();
    const { currentUser } = (0, useUserStore_1.useUserStore)();
    const handlePostFormChange = ({ target: { name, value }, }) => {
        setPostFormInputs((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handlePostSubmit = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (loadingPosts) {
            return;
        }
        try {
            setLoadingPosts(true);
            const postId = (0, uuid_1.v4)();
            if (!currentUser ||
                !currentUser.response ||
                !currentUser.response.username) {
                throw new Error("Cannot create post without a valid user");
            }
            yield createNewPost({
                id: postId,
                created: postFormInputs.created,
                title: postFormInputs.title,
                image: postFormInputs.image,
                description: postFormInputs.description,
                comments: [],
                user: currentUser.response,
            });
            setPostFormInputs({
                created: new Date(),
                title: "",
                image: "",
                description: "",
                comments: [],
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoadingPosts(false);
        }
    });
    return {
        handlePostSubmit,
        handlePostFormChange,
        postFormInputs,
        setPostFormInputs,
        loadingPosts,
    };
}
exports.useCreatePost = useCreatePost;
//# sourceMappingURL=useCreatePost.js.map