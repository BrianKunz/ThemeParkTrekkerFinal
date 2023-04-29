import { create } from "zustand";
import { userService } from "../services/userService";

interface UserStore {
  users: User[];
  currentUser: {
    response: User | null;
    config: any;
  };
  createNewUser: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
}

interface User {
  id?: string;
  username: string;
  email?: string;
  password?: string;
  admin?: boolean;
}

export const useUserStore = create<UserStore>(() => ({
  users: [],
  currentUser: {
    response: null,
    config: {},
  },
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
      useUserStore.setState({ currentUser: { response, config } });
    } catch (error) {
      console.error(error);
    }
  },
}));
