import { User } from "../entities/User.entity";
interface UserStore {
    users: User[];
    currentUser: User | null;
    createNewUser: (user: User) => Promise<void>;
    login: (user: User) => Promise<void>;
}
export declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserStore>>;
export {};
