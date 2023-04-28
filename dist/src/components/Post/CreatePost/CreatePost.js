"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreatePost_1 = require("./useCreatePost");
function CreatePost() {
    const { postFormInputs, handlePostFormChange, handlePostSubmit } = (0, useCreatePost_1.useCreatePost)();
    return (React.createElement("form", { onSubmit: handlePostSubmit, method: "POST" },
        React.createElement("label", { htmlFor: "title" }, "Title"),
        React.createElement("input", { type: "text", name: "title", value: postFormInputs.title, onChange: handlePostFormChange, required: true }),
        React.createElement("label", { htmlFor: "image" }, "Image Link"),
        React.createElement("input", { type: "text", name: "image", value: postFormInputs.image, onChange: handlePostFormChange }),
        React.createElement("label", { htmlFor: "description" }, "Description"),
        React.createElement("input", { type: "text", name: "description", value: postFormInputs.description, onChange: handlePostFormChange, required: true }),
        React.createElement("button", { type: "submit" }, "Submit")));
}
exports.default = CreatePost;
//# sourceMappingURL=CreatePost.js.map