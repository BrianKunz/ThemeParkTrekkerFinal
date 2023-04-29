import express, { Request, Response } from "express";
import { Post } from "../entities/Post.entity";
import pool from "../../database";
import jwt from "jsonwebtoken";

const postController = express.Router();

// declare module "express-session" {
//   interface Session {
//     userId?: number;
//     token?: string;
//   }
// }

// Index
postController.get("/", async (_, res) => {
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

postController.post("/", async (req: Request, res: Response) => {
  const { title, image, description } = req.body;
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    const decodedToken = jwt.verify(token, secret) as { userId: string };
    const userId = decodedToken.userId.toString();

    // Check if user is an admin
    if (userId !== process.env.ADMIN_USER_ID) {
      throw new Error("Unauthorized");
    }

    const { rows: postRows } = await pool.query<Post>(
      "INSERT INTO posts (title, image, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, image, description, userId]
    );
    const post = postRows[0];

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Update
postController.put("/:id", async (req: Request, res: Response) => {
  const { title, image, description } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    const decodedToken = jwt.verify(token, secret) as { userId: string };
    console.log("decodedToken:", decodedToken);

    const userId = decodedToken.userId.toString();
    console.log("userId:", userId);

    console.log("userId:", typeof userId, userId);
    console.log(
      "ADMIN_USER_ID:",
      typeof process.env.ADMIN_USER_ID,
      process.env.ADMIN_USER_ID
    );

    // Check if user is an admin
    if (userId !== process.env.ADMIN_USER_ID) {
      throw new Error("Unauthorized");
    }
    console.log(
      "userId === ADMIN_USER_ID:",
      userId === process.env.ADMIN_USER_ID
    );

    console.log("userId:", typeof userId, userId);
    console.log(
      "ADMIN_USER_ID:",
      typeof process.env.ADMIN_USER_ID,
      process.env.ADMIN_USER_ID
    );

    const { rows: postRows } = await pool.query<Post>(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    const post = postRows[0];
    if (!post) {
      return res.status(404).json({ message: "Not Found" });
    }

    const result = await pool.query<Post>(
      "UPDATE posts SET title = $1, image = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, image, description, id, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(500).json(new Error("Internal Server Error"));
});

// Delete
postController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    const decodedToken = jwt.verify(token, secret) as { userId: string };
    console.log("decodedToken:", decodedToken);

    const userId = decodedToken.userId.toString();
    console.log("userId:", userId);

    console.log("userId:", typeof userId, userId);
    console.log(
      "ADMIN_USER_ID:",
      typeof process.env.ADMIN_USER_ID,
      process.env.ADMIN_USER_ID
    );

    // Check if user is an admin
    if (userId !== process.env.ADMIN_USER_ID) {
      throw new Error("Unauthorized");
    }
    console.log(
      "userId === ADMIN_USER_ID:",
      userId === process.env.ADMIN_USER_ID
    );

    console.log("userId:", typeof userId, userId);
    console.log(
      "ADMIN_USER_ID:",
      typeof process.env.ADMIN_USER_ID,
      process.env.ADMIN_USER_ID
    );

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
  return res.status(500).json(new Error("Internal Server Error"));
});

export default postController;
