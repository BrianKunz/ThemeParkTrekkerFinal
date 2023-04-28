import express, { Request, Response } from "express";
import pool from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Session } from "express-session";

const userController = express.Router();

// Get all users
userController.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, request: req.url });
  }
});

// Create user
userController.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password, admin } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO users (username, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hash, admin]
    );
    const user = result.rows[0];
    client.release();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Login user
userController.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];
    client.release();

    if (!user) {
      res.status(401).json("Invalid username or password");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json("Invalid username or password");
      return;
    }

    // Set isAdmin property
    const isAdmin = user.admin === true;

    const session = req.session as Session;
    session.userId = user.id;

    // Generate JWT token
    const secret = process.env.JWT_SECRET || "default-secret";
    const token = jwt.sign({ userId: user.id }, secret);
    // const userId = (req.session as Session).userId;

    console.log("token: ", token);
    console.log("session id: ", req.sessionID);
    console.log("login session data: ", req.session);
    console.log("req session login: ", session.userId);

    res.json({ user: { ...user, isAdmin }, token, session_id: req.sessionID });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default userController;
