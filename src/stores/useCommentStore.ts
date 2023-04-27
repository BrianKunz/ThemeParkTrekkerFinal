import { create } from "zustand";
import { commentService } from "../services/commentService";
import { Post } from "../entities/Post.entity";
import { Comment } from "../entities/Comment.entity";
import { User } from "../entities/User.entity";
import { userService } from "../services/userService";

interface CommentStore {
  comments: Comment[];
  user: User | null;
  getAllComments: (post: Post) => Promise<void>;
  createNewComment: (comment: Comment, post: Post) => Promise<void>;
  updateComment: (comment: Comment, post: Post) => Promise<void>;
  deleteComment: (id: string, post: Post) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  user: userService.getCurrentUser() || { id: "", username: "", email: "" },
  getAllComments: async (post) => {
    try {
      const comments = await commentService.getAll();
      const filteredComments = comments.filter((comment: Comment) => {
        //@ts-ignore
        return comment.post === post?.id; // Use type guard to check if post is undefined
      });
      set({ comments: filteredComments });
    } catch (error) {
      console.error(error);
    }
  },
  createNewComment: async (comment, post) => {
    try {
      const { getAllComments } = get();
      const { user } = get();
      await commentService.create({
        ...comment,
        user,
        post,
      });
      await getAllComments(post);
    } catch (error) {
      console.error(error);
    }
  },
  updateComment: async (comment, post) => {
    try {
      const { getAllComments } = get();
      await commentService.update(comment.id!, comment);
      await getAllComments(post);
    } catch (error) {
      console.error(error);
    }
  },
  deleteComment: async (id, post) => {
    try {
      const { getAllComments } = get();
      await commentService.delete(id);
      await getAllComments(post);
    } catch (error) {
      console.error(error);
    }
  },
}));
