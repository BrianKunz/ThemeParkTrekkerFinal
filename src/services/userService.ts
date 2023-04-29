import axios from "axios";
import { User } from "../entities/User.entity";
import Cookies from "cookie";

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
    const options = { httpOnly: true };
    const cookies = Cookies.serialize("accessToken", token, options);
    document.cookie = cookies;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.defaults.headers.common = config.headers;

    return { response: response.data, userId, config: config };
  },

  getCurrentUser: async () => {
    const cookies = Cookies.parse(document.cookie);
    const token = cookies["accessToken"];

    if (token) {
      // If the cookie exists, return the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.defaults.headers.common = config.headers;
      return axios.get(`${baseURL}me`).then((response) => response.data);
    }

    // If the cookie does not exist, return null
    return null;
  },
};
