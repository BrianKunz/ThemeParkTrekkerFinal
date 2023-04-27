import { User } from "../entities/User.entity";
export declare const userService: {
    getAll: () => Promise<User[]>;
    create: (user: User) => Promise<User>;
    login: (user: User) => Promise<User>;
    getCurrentUser: () => User | null;
};
