"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useCreatePost_1 = require("./useCreatePost");
function CreatePost() {
    const { postFormInputs, handlePostFormChange, handlePostSubmit } = (0, useCreatePost_1.useCreatePost)();
    return (react_1.default.createElement("form", { onSubmit: handlePostSubmit, method: "POST" },
        react_1.default.createElement("label", { htmlFor: "title" }, "Title"),
        react_1.default.createElement("input", { type: "text", name: "title", value: postFormInputs.title, onChange: handlePostFormChange, required: true }),
        react_1.default.createElement("label", { htmlFor: "image" }, "Image Link"),
        react_1.default.createElement("input", { type: "text", name: "image", value: postFormInputs.image, onChange: handlePostFormChange }),
        react_1.default.createElement("label", { htmlFor: "description" }, "Description"),
        react_1.default.createElement("input", { type: "text", name: "description", value: postFormInputs.description, onChange: handlePostFormChange, required: true }),
        react_1.default.createElement("button", { type: "submit" }, "Submit")));
}
exports.default = CreatePost;
//# sourceMappingURL=CreatePost.js.map