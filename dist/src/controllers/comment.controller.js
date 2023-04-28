"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const commentController = express_1.default.Router();
// Authorization middleware
const authorize = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET || "default-secret";
    try {
        // Decode the token and extract the user ID
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decodedToken === "object" && decodedToken.userId) {
            const userId = decodedToken.userId;
            // Query the users table to check if the user exists
            const { rows } = yield database_1.default.query("SELECT * FROM users WHERE id = $1", [userId]);
            const user = rows[0];
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            // Set the req.user property and call the next middleware function
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json(new Error("Internal Server Error"));
});
// Show comments for a post
commentController.get("/:postId", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
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
commentController.post("/:postId", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req.body;
    const { postId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        const result = yield database_1.default.query("INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *", [body, postId, userId]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
// Delete a comment
commentController.delete("/:commentId", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { commentId } = req.params;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
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
    return res.status(500).json(new Error("Internal Server Error"));
}));
exports.default = commentController;
//# sourceMappingURL=comment.controller.js.map