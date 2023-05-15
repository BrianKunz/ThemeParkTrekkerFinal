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
  user: null,
  getAllComments: async (post) => {
    try {
      const comments = await commentService.getAll();
      const filteredComments = comments.filter((comment: Comment) => {
        return comment.post?.id === post?.id;
      });
      set({ comments: filteredComments });
    } catch (error) {
      console.error(error);
    }
  },
  createNewComment: async (comment, post) => {
    try {
      const { getAllComments } = get();
      const user = await userService.getCurrentUser();
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
