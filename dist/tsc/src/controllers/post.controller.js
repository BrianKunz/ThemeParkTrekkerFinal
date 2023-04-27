import { __awaiter } from "tslib";
import express from "express";
import pool from "../../database";
const postController = express.Router();
// Index
postController.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield pool.query("SELECT * FROM posts");
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Show
postController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = rows[0];
        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Create
postController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    const userId = req.session.userId;
    // Check if user is an admin
    try {
        const { rows } = yield pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = rows[0];
        if (!user || !user.admin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { rows: postRows } = yield pool.query("INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *", [title, body, userId]);
        const post = postRows[0];
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Update
postController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    const { id } = req.params;
    const userId = req.session.userId;
    // Check if user is an admin
    try {
        const { rows } = yield pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = rows[0];
        if (!user || !user.admin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { rows: postRows } = yield pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = postRows[0];
        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = yield pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *", [title, body, id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Delete
postController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = rows[0];
        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }
        yield pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
export default postController;
//# sourceMappingURL=post.controller.js.map