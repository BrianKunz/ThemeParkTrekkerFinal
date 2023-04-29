import axios from "axios";
import { User } from "../entities/User.entity";
import { LocalStorage } from "node-localstorage";

const baseURL = "https://themeparktrekker.herokuapp.com/users/";
const localStorage = new LocalStorage("./scratch");

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
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userId", userId);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.defaults.headers.common = config.headers;

    return { response: response.data, userId, config: config };
  },

  getCurrentUser: async () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user as User;
    } else {
      return null;
    }
  },
};
