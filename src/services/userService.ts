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
    try {
      console.log("User data: ", user);
      const response = await axios.post(`${baseURL}signup`, user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error signing up: ", error);
      throw error;
    }
  },
  login: async (
    user: User
  ): Promise<{
    response: User;
    userId: string;
    config: { headers: { Authorization: string } };
  }> => {
    const response = await axios.post(`${baseURL}login`, user);

    // Log the entire response object
    console.log("Response:", response);

    // Check if the 'user' object exists in the response data
    if (!response.data.user) {
      throw new Error("User not found in the response data.");
    }

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

  getCurrentUser: async (token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.defaults.headers.common = config.headers;
    return axios.get(`${baseURL}me`).then((response) => response.data);
  },
};
