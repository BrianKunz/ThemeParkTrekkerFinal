"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const cookie_1 = require("../../helpers/cookie");
const commentController = express_1.default.Router();
const authorize = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const token = (0, cookie_1.getCookie)("accessToken");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const secret = process.env.JWT_SECRET || "default-secret";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        if (typeof decodedToken === "object" && decodedToken.userId) {
            const userId = decodedToken.userId;
            const { rows } = yield database_1.default.query("SELECT * FROM users WHERE id = $1", [userId]);
            const user = rows[0];
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
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
    return res.status(500).json({ message: "Internal Server Error" });
});
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
commentController.post("/:postId", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req.body;
    const { postId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const post = yield database_1.default.query("SELECT * FROM posts WHERE id = $1", [
            postId,
        ]);
        if (post.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        const result = yield database_1.default.query("INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *", [body, postId, userId]);
        return res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
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
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}));
exports.default = commentController;
//# sourceMappingURL=comment.controller.js.map