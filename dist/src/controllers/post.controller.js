"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const cookie_1 = require("../../helpers/cookie");
const postController = express_1.default.Router();
const authorize = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("accessToken=")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const secret = process.env.JWT_SECRET || "default-secret";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const userId = decodedToken.userId.toString();
        const { rows } = yield database_1.default.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return next();
});
postController.get("/", (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM posts");
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
postController.get("/:id", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (!rows.length) {
            res.status(404).json({ message: "Not Found" });
            return Promise.resolve();
        }
        res.json(rows[0]);
        return Promise.resolve();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return Promise.reject();
    }
}));
postController.post("/", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, image, description } = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    console.log("title:", title);
    console.log("image:", image);
    console.log("description:", description);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { rows: postRows } = yield database_1.default.query("INSERT INTO posts (title, image, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, image, description, userId]);
        const post = postRows[0];
        res.json(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
}));
postController.put("/:id", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { title, image, description } = req.body;
    const { id } = req.params;
    const token = (0, cookie_1.getCookie)("accessToken");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const secret = process.env.JWT_SECRET || "default-secret";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const userId = decodedToken.userId.toString();
        if (userId !== process.env.ADMIN_USER_ID) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { rows: postRows } = yield database_1.default.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = postRows[0];
        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = yield database_1.default.query("UPDATE posts SET title = $1, image = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING *", [title, image, description, id, userId]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
}));
postController.delete("/:id", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    if (!token) {
        throw new Error("Token is missing");
    }
    const secret = process.env.JWT_SECRET || "default-secret";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        console.log("decodedToken:", decodedToken);
        const userId = decodedToken.userId.toString();
        console.log("userId:", userId);
        console.log("userId:", typeof userId, userId);
        console.log("ADMIN_USER_ID:", typeof process.env.ADMIN_USER_ID, process.env.ADMIN_USER_ID);
        if (userId !== process.env.ADMIN_USER_ID) {
            throw new Error("Unauthorized");
        }
        console.log("userId === ADMIN_USER_ID:", userId === process.env.ADMIN_USER_ID);
        console.log("userId:", typeof userId, userId);
        console.log("ADMIN_USER_ID:", typeof process.env.ADMIN_USER_ID, process.env.ADMIN_USER_ID);
        const { rows } = yield database_1.default.query("SELECT * FROM posts WHERE id = $1", [id]);
        const post = rows[0];
        if (!post) {
            return res.status(404).json({ message: "Not Found" });
        }
        yield database_1.default.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
        return;
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
exports.default = postController;
//# sourceMappingURL=post.controller.js.map