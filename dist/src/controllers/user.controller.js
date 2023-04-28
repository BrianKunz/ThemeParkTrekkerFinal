"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userController = express_1.default.Router();
// Get all users
userController.get("/", async (req, res) => {
    try {
        const client = await database_1.default.connect();
        const result = await client.query("SELECT * FROM users");
        res.json(result.rows);
        client.release();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error, request: req.url });
    }
});
// Create user
userController.post("/signup", async (req, res) => {
    const { username, email, password, admin } = req.body;
    try {
        const hash = await bcrypt_1.default.hash(password, 10);
        const client = await database_1.default.connect();
        const result = await client.query("INSERT INTO users (username, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *", [username, email, hash, admin]);
        const user = result.rows[0];
        client.release();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
// Login user
userController.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const client = await database_1.default.connect();
        const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];
        client.release();
        if (!user) {
            res.status(401).json("Invalid username or password");
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json("Invalid username or password");
            return;
        }
        // Set isAdmin property
        const isAdmin = user.admin === true;
        const session = req.session;
        if (session) {
            session.userId = user.id;
        }
        // Generate JWT token
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret);
        const sessionID = req.sessionID;
        if (sessionID) {
            res.json({ user: { ...user, isAdmin }, token, session_id: sessionID });
        }
        else {
            res.status(500).json("sessionID is not defined");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.default = userController;
//# sourceMappingURL=user.controller.js.map