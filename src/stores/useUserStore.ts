import { create } from "zustand";
import { userService } from "../services/userService";
import { User } from "../entities/User.entity"; // Assuming you have this User entity
import axios from "axios";

interface UserStore {
  users: User[];
  currentUser: User | null;
  createNewUser: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentUser: null,
  createNewUser: async (user) => {
    try {
      console.log(user);
      const response = await userService.create(user);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  login: async (user) => {
    try {
      const { response, config } = await userService.login(user);
      // Update currentUser in state
      set({ currentUser: response });
      // Store user data and token in localStorage
      localStorage.setItem("currentUser", JSON.stringify(response));
      localStorage.setItem("token", config.headers.Authorization);
    } catch (error) {
      console.error(error);
    }
  },
  logout: () => {
    // Clear currentUser from state and remove data from localStorage
    set({ currentUser: null });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  },
  loadUserFromStorage: () => {
    // Load user data and token from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = localStorage.getItem("token") || "";
    if (user && token) {
      set({ currentUser: user });
      // Update axios default headers
      axios.defaults.headers.common["Authorization"] = token;
    }
  },
}));
