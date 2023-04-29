"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useCreateComment_1 = require("./useCreateComment");
function CreateComment({ post, currentUser }) {
    const { commentFormInputs, handleCommentFormChange, handleCommentSubmit, loadingComments, } = (0, useCreateComment_1.useCreateComment)(post, currentUser);
    return (react_1.default.createElement("form", { onSubmit: handleCommentSubmit, method: "POST", className: "my-4 mx-auto w-full lg:w-3/4 xl:w-1/2 bg-gray-200 rounded-md p-4" },
        react_1.default.createElement("label", { htmlFor: "body", className: "block font-bold text-lg mb-2" }, "Comment"),
        react_1.default.createElement("textarea", { className: "border rounded py-2 px-3 mb-2 w-full", name: "body", value: commentFormInputs.body, onChange: handleCommentFormChange, required: true }),
        react_1.default.createElement("button", { type: "submit", disabled: loadingComments, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" }, "Submit")));
}
exports.default = CreateComment;
//# sourceMappingURL=CreateComment.js.map