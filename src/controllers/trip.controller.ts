import express, { Request, Response, NextFunction } from "express";
import { Trip } from "../entities/Trip.entity";
import { User } from "../entities/User.entity";
import pool from "../../database";
import jwt from "jsonwebtoken";

const tripController = express.Router();

interface AuthRequest extends Request {
  user?: User;
}

// Authorization middleware
const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    // Decode the token and extract the user ID
    const decodedToken = jwt.verify(token, secret);
    if (typeof decodedToken === "object" && decodedToken.userId) {
      const userId = decodedToken.userId;

      // Query the users table to check if the user exists
      const { rows } = await pool.query<User>(
        "SELECT * FROM users WHERE id = $1",
        [userId]
      );
      const user = rows[0];
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Set the req.user property and call the next middleware function
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Index
tripController.get("/", authorize, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const { rows } = await pool.query<Trip>(
      "SELECT * FROM trips WHERE user_id = $1",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      // check if headers have been sent
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Show
tripController.get(
  "/:id",
  authorize,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
      const { rows } = await pool.query<Trip>(
        "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
        [id, req.user?.id]
      );
      const trip = rows[0];
      if (!trip) {
        return res.status(404).json({ message: "Not Found" });
      }
      res.json(trip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
);

// Create
tripController.post("/", authorize, async (req: AuthRequest, res: Response) => {
  const { title, date, start_date, end_date, flight } = req.body;
  const userId = req.user?.id;

  try {
    const { rows: userRows } = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const { rows } = await pool.query<Trip>(
      "INSERT INTO trips (title, date, start_date, end_date, flight, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, date, start_date, end_date, flight, userId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
});

// Update
tripController.put(
  "/:id",
  authorize,
  async (req: AuthRequest, res: Response) => {
    const { title, date, start_date, end_date, flight } = req.body;
    const { id } = req.params;

    try {
      const { rows } = await pool.query<Trip>(
        "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
        [id, req.user?.id]
      );
      const trip = rows[0];
      if (!trip) {
        return res.status(404).json({ message: "Not Found" });
      }

      const result = await pool.query<Trip>(
        "UPDATE trips SET title = $1, date = $2, start_date = $3, end_date = $4, flight = $5 WHERE id = $6 RETURNING *",
        [title, date, start_date, end_date, flight, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
);

// Delete
tripController.delete(
  "/:id",
  authorize,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
      const { rows } = await pool.query<Trip>(
        "SELECT * FROM trips WHERE id = $1 AND user_id = $2",
        [id, req.user?.id]
      );
      const trip = rows[0];
      if (!trip) {
        return res.status(404).json({ message: "Not Found" });
      }

      await pool.query("DELETE FROM trips WHERE id = $1", [id]);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
);

export default tripController;
