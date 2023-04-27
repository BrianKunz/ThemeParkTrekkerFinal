import { create } from "zustand";
import { userService } from "../services/userService";
import { User } from "../entities/User.entity";

interface UserStore {
  users: User[];
  currentUser: User | null;
  createNewUser: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
}

export const useUserStore = create<UserStore>(() => ({
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
      console.log(user);
      const loggedInUser = await userService.login(user);
      console.log(loggedInUser);
      useUserStore.setState({ currentUser: loggedInUser });
    } catch (error) {
      console.error(error);
    }
  },
}));
