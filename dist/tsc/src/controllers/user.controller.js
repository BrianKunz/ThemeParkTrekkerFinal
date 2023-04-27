import { __awaiter } from "tslib";
import express from "express";
import pool from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userController = express.Router();
// Get all users
userController.get("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query("SELECT * FROM users");
        res.json(result.rows);
        client.release();
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// Create user
userController.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, admin } = req.body;
    try {
        const hash = yield bcrypt.hash(password, 10);
        const client = yield pool.connect();
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
// Login user
userController.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const client = yield pool.connect();
        const result = yield client.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];
        client.release();
        if (!user) {
            res.status(401).json("Invalid username or password");
            return;
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json("Invalid username or password");
            return;
        }
        // Generate JWT token
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jwt.sign({ userId: user.id }, secret);
        console.log("token: ", token);
        res.json({ user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
export default userController;
//# sourceMappingURL=user.controller.js.map