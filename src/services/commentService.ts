import axios from "axios";
import { Comment } from "../entities/Comment.entity";

const baseURL = "/comments/";

export const commentService = {
  getAll: async (): Promise<Comment[]> => {
    const response = await axios.get(baseURL);
    return response.data;
  },

  getOne: async (id: string): Promise<Comment> => {
    const response = await axios.get(baseURL + id);
    return response.data;
  },

  create: async (comment: Comment): Promise<Comment> => {
    const response = await axios.post(baseURL, comment);
    return response.data;
  },

  update: async (id: string, comment: Comment): Promise<Comment> => {
    const response = await axios.put(baseURL + id, comment);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(baseURL + id);
  },
};
