"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userController = express_1.default.Router();
userController.get("/", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield database_1.default.connect();
        const result = yield client.query("SELECT * FROM users");
        res.json(result.rows);
        client.release();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error, request: req.url });
    }
}));
userController.post("/signup", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, admin } = req.body;
    try {
        const hash = yield bcrypt_1.default.hash(password, 10);
        const client = yield database_1.default.connect();
        const result = yield client.query("INSERT INTO users (username, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, hash, admin]);
        const user = result.rows[0];
        client.release();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
userController.post("/login", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const client = yield database_1.default.connect();
        const result = yield client.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];
        client.release();
        if (!user) {
            res.status(401).json("Invalid username or password");
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json("Invalid username or password");
            return;
        }
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret);
        res.cookie("accessToken", token, { httpOnly: true });
        delete user.password;
        res.json({
            message: "Logged in successfully",
            user: { id: user.id, username: user.username },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
exports.default = userController;
//# sourceMappingURL=user.controller.js.map