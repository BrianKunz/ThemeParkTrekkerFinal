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
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userId", userId);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.defaults.headers.common = config.headers;

    return { response: response.data, userId, config: config };
  },

  getCurrentUser: async () => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user as User;
    } else {
      return null;
    }
  },
};
