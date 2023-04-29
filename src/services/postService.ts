import axios from "axios";
import { Post } from "../entities/Post.entity";

const baseURL = "https://themeparktrekker.herokuapp.com/posts/";

export const postService = {
  getAll: async (): Promise<Post[]> => {
    const response = await axios.get(baseURL);
    return response.data;
  },

  getOne: async (id: string): Promise<Post> => {
    const response = await axios.get(baseURL + id);
    return response.data;
  },

  create: async (post: Post): Promise<Post> => {
    const token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(baseURL, post, config);
    return response.data;
  },

  update: async (id: string, post: Post): Promise<Post> => {
    const response = await axios.put(baseURL + id, post);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(baseURL + id);
  },
};
