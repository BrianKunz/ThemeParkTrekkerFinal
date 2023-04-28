"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useCreateComment_1 = require("./useCreateComment");
function CreateComment({ post, currentUser }) {
    const { commentFormInputs, handleCommentFormChange, handleCommentSubmit, loadingComments, } = (0, useCreateComment_1.useCreateComment)(post, currentUser);
    return (react_1.default.createElement("form", { onSubmit: handleCommentSubmit, method: "POST" },
        react_1.default.createElement("label", { htmlFor: "body" }, "Comment"),
        react_1.default.createElement("input", { type: "text", name: "body", value: commentFormInputs.body, onChange: handleCommentFormChange, required: true }),
        react_1.default.createElement("button", { type: "submit", disabled: loadingComments }, "Submit")));
}
exports.default = CreateComment;
//# sourceMappingURL=CreateComment.js.map