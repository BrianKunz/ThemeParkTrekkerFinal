"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const commentController = express_1.default.Router();
// Show comments for a post
commentController.get("/:postId", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Create a comment on a post
commentController.post("/:postId", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // Check if the post exists
        const post = yield database_1.default.query("SELECT * FROM posts WHERE id = $1", [
            postId,
        ]);
        if (post.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Create the comment
        const result = yield database_1.default.query("INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *", [content, userId, postId]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Delete a comment
commentController.delete("/:commentId", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const result = yield database_1.default.query("DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *", [commentId, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
exports.default = commentController;
//# sourceMappingURL=comment.controller.js.map