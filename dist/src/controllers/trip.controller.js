"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database_1 = tslib_1.__importDefault(require("../../database"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const tripController = express_1.default.Router();
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
    return res.status(401).json({ message: "Unauthorized" });
});
// Index
tripController.get("/", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM trips WHERE user_id = $1", [userId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Show
tripController.get("/:id", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM trips WHERE id = $1 AND user_id = $2", [id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id]);
        const trip = rows[0];
        if (!trip) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
// Create
tripController.post("/", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { title, date, start_date, end_date, flight } = req.body;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const userRepository = database_1.default.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = (yield userRepository).rows[0];
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const { rows } = yield database_1.default.query("INSERT INTO trips (title, date, start_date, end_date, flight, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, date, start_date, end_date, flight, userId]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
// Update
tripController.put("/:id", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { title, date, start_date, end_date, flight } = req.body;
    const { id } = req.params;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM trips WHERE id = $1 AND user_id = $2", [id, (_d = req.user) === null || _d === void 0 ? void 0 : _d.id]);
        const trip = rows[0];
        if (!trip) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = yield database_1.default.query("UPDATE trips SET title = $1, date = $2, start_date = $3, end_date = $4, flight = $5 WHERE id = $6 RETURNING *", [title, date, start_date, end_date, flight, id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
// Delete
tripController.delete("/:id", authorize, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { id } = req.params;
    try {
        const { rows } = yield database_1.default.query("SELECT * FROM trips WHERE id = $1 AND user_id = $2", [id, (_e = req.user) === null || _e === void 0 ? void 0 : _e.id]);
        const trip = rows[0];
        if (!trip) {
            return res.status(404).json({ message: "Not Found" });
        }
        yield database_1.default.query("DELETE FROM trips WHERE id = $1", [id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json(new Error("Internal Server Error"));
}));
exports.default = tripController;
//# sourceMappingURL=trip.controller.js.map