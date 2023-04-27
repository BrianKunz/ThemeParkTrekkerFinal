import { __awaiter } from "tslib";
import express from "express";
import pool from "../../database";
const commentController = express.Router();
// Show comments for a post
commentController.get("/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Create a comment on a post
commentController.post("/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // Check if the post exists
        const post = yield pool.query("SELECT * FROM posts WHERE id = $1", [
            postId,
        ]);
        if (post.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Create the comment
        const result = yield pool.query("INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *", [content, userId, postId]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Delete a comment
commentController.delete("/:commentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const result = yield pool.query("DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *", [commentId, userId]);
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
export default commentController;
//# sourceMappingURL=comment.controller.js.map