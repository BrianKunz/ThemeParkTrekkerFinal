import { __awaiter } from "tslib";
import express from "express";
import pool from "../../database";
const tripController = express.Router();
// Index
tripController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { rows } = yield pool.query("SELECT * FROM trips WHERE user_id = $1", [userId]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Show
tripController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM trips WHERE id = $1", [id]);
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
    return res.status(500).json({ message: "Unknown Error" });
}));
// Create
tripController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, start_date, end_date, flight } = req.body;
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userRepository = pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const user = (yield userRepository).rows[0];
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const { rows } = yield pool.query("INSERT INTO trips (title, date, start_date, end_date, flight, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, date, start_date, end_date, flight, userId]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
// Update
tripController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, start_date, end_date, flight } = req.body;
    const { id } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM trips WHERE id = $1", [id]);
        const trip = rows[0];
        if (!trip) {
            return res.status(404).json({ message: "Not Found" });
        }
        const result = yield pool.query("UPDATE trips SET title = $1, date = $2, start_date = $3, end_date = $4, flight = $5 WHERE id = $6 RETURNING *", [title, date, start_date, end_date, flight, id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
tripController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rows } = yield pool.query("SELECT * FROM trips WHERE id = $1", [id]);
        const trip = rows[0];
        if (!trip) {
            return res.status(404).json({ message: "Not Found" });
        }
        yield pool.query("DELETE FROM trips WHERE id = $1", [id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Unknown Error" });
}));
export default tripController;
//# sourceMappingURL=trip.controller.js.map