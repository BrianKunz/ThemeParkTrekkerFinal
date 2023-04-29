import axios from "axios";
import { Post } from "../entities/Post.entity";
import { getCookie } from "../../helpers/cookie";

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
    const token = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(baseURL, post, config);
    return response.data;
  },

  update: async (id: string, post: Post): Promise<Post> => {
    const token = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(baseURL + id, post, config);
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
