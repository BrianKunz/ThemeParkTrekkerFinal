"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreatePost_1 = require("./useCreatePost");
function CreatePost() {
    const { postFormInputs, handlePostFormChange, handlePostSubmit } = (0, useCreatePost_1.useCreatePost)();
    return (React.createElement("div", { className: "bg-white rounded-md shadow-md p-4 mx-auto my-4 w-full lg:w-3/4 xl:w-1/2" },
        React.createElement("h2", { className: "text-xl font-bold mb-4" }, "Create Post"),
        React.createElement("form", { onSubmit: handlePostSubmit, method: "POST" },
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "title" }, "Title"),
                React.createElement("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "text", name: "title", value: postFormInputs.title, onChange: handlePostFormChange, required: true })),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "image" }, "Image Link"),
                React.createElement("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "text", name: "image", value: postFormInputs.image, onChange: handlePostFormChange })),
            React.createElement("div", { className: "mb-6" },
                React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "description" }, "Description"),
                React.createElement("input", { className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", type: "text", name: "description", value: postFormInputs.description, onChange: handlePostFormChange, required: true })),
            React.createElement("div", { className: "flex justify-end" },
                React.createElement("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "submit" }, "Submit")))));
}
exports.default = CreatePost;
//# sourceMappingURL=CreatePost.js.map