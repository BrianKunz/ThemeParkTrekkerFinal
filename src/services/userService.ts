import axios from "axios";
import { User } from "../entities/User.entity";

const baseURL = "https://themeparktrekker.herokuapp.com/users/";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get(baseURL);
    return response.data;
  },
  create: async (user: User): Promise<User> => {
    const response = await axios.post(`${baseURL}signup`, user);
    console.log(response.data);
    return response.data;
  },
  login: async (
    user: User
  ): Promise<{
    response: User;
    userId: string;
    config: { headers: { Authorization: string } };
  }> => {
    const response = await axios.post(`${baseURL}login`, user);
    const token = response.data.token;
    const userId = response.data.user.id;

    // Set the token in a cookie
    document.cookie = `accessToken=${token}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.defaults.headers.common = config.headers;

    return { response: response.data, userId, config: config };
  },

  getCurrentUser: async () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "accessToken") {
        // If the cookie exists, return the token
        const token = decodeURIComponent(value);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios.defaults.headers.common = config.headers;
        return axios.get(`${baseURL}me`).then((response) => response.data);
      }
    }

    // If the cookie does not exist, return null
    return null;
  },
};
