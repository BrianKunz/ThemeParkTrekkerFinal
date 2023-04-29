import axios from "axios";
import { Comment } from "../entities/Comment.entity";
import { getCookie } from "../../helpers/cookie";

const baseURL = "https://themeparktrekker.herokuapp.com/comments/";

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
    const token = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(baseURL, comment, config);
    return response.data;
  },

  update: async (id: string, comment: Comment): Promise<Comment> => {
    const token = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(baseURL + id, comment, config);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    const token = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(baseURL + id, config);
  },
};
