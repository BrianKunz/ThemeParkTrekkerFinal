import express, { Request, Response, NextFunction } from "express";
import { Post } from "../entities/Post.entity";
import pool from "../../database";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.entity";

const postController = express.Router();

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
postController.get("/", async (_, res) => {
  try {
    const { rows } = await pool.query<Post>("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Show One
postController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query<Post>(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    if (!rows.length) {
      res.status(404).json({ message: "Not Found" });
      return Promise.resolve();
    }
    res.json(rows[0]);
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return Promise.reject();
  }
});

// Post
postController.post("/", authorize, async (req: AuthRequest, res: Response) => {
  const { title, image, description } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { rows: postRows } = await pool.query<Post>(
      "INSERT INTO posts (title, image, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, image, description, userId]
    );
    const post = postRows[0];
    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update
postController.put("/:id", async (req: Request, res: Response) => {
  const { title, image, description } = req.body;
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    const decodedToken = jwt.verify(token, secret) as { userId: string };
    const userId = decodedToken.userId.toString();

    // Check if user is an admin
    if (userId !== process.env.ADMIN_USER_ID) {
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
      "UPDATE posts SET title = $1, image = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, image, description, id, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
});

// Delete
postController.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token is missing");
  }

  const token = authHeader.split(" ")[1];
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
    return;
  }
  return res.status(500).json(new Error("Internal Server Error"));
});

export default postController;
