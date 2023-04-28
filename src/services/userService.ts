import axios from "axios";
import { User } from "../entities/User.entity";

const baseURL = "localhost:3001/users/";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get(baseURL);
    return response.data;
  },
  create: async (user: User): Promise<User> => {
    const response = await axios.post(`${baseURL}signup`, user);
    return response.data;
  },
  login: async (user: User): Promise<User> => {
    const response = await axios.post(`${baseURL}login`, user);
    const token = response.data.token;
    const userId = response.data.user.id;
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userId", userId);
    return response.data;
  },
  getCurrentUser: (): User | null => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  },
};
