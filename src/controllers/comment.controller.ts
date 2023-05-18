import express, { Request, Response, NextFunction } from "express";
import { Comment } from "../entities/Comment.entity";
import { Post } from "../entities/Post.entity";
import { User } from "../entities/User.entity";
import pool from "../../database";
import jwt from "jsonwebtoken";

const commentController = express.Router();

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

// Show comments for a post
commentController.get(
  "/:postId",
  authorize,
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;

    try {
      const { rows } = await pool.query<Comment>(
        "SELECT * FROM comments WHERE post_id = $1",
        [postId]
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Create a comment on a post
commentController.post(
  "/:postId",
  authorize,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { body } = req.body;
    const { postId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      // Check if the post exists
      const post = await pool.query<Post>("SELECT * FROM posts WHERE id = $1", [
        postId,
      ]);

      if (post.rowCount === 0) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      // Create the comment
      const result = await pool.query<Comment>(
        "INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *",
        [body, postId, userId]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return; // Add this line
    }
  }
);

// Delete a comment
commentController.delete(
  "/:commentId",
  authorize,
  async (req: AuthRequest, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const result = await pool.query<Comment>(
        "DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *",
        [commentId, userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(204).send();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

export default commentController;
