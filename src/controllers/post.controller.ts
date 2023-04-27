import express, { Request, Response } from "express";
import { Session } from "express-session";
import { Post } from "../entities/Post.entity";
import { User } from "../entities/User.entity";
import pool from "../../database";

const postController = express.Router();

declare module "express-session" {
  interface Session {
    userId?: number;
  }
}

// Index
postController.get("/", async (res: Response) => {
  try {
    const { rows } = await pool.query<Post>("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Show
postController.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query<Post>(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    const post = rows[0];
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(500).json({ message: "Unknown Error" });
});

// Create
postController.post("/", async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const userId = (req.session as Session).userId;

  // Check if user is an admin
  try {
    const { rows } = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    const user = rows[0];
    if (!user || !user.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { rows: postRows } = await pool.query<Post>(
      "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, body, userId]
    );
    const post = postRows[0];
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  return res.status(500).json({ message: "Unknown Error" });
});

// Update
postController.put("/:id", async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const { id } = req.params;
  const userId = (req.session as Session).userId;

  // Check if user is an admin
  try {
    const { rows } = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    const user = rows[0];
    if (!user || !user.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { rows: postRows } = await pool.query<Post>(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    const post = postRows[0];
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }

    const result = await pool.query<Post>(
      "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *",
      [title, body, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  return res.status(500).json({ message: "Unknown Error" });
});

// Delete
postController.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query<Post>(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    const post = rows[0];
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  return res.status(500).json({ message: "Unknown Error" });
});

export default postController;
