import { User } from "../entities/User.entity";
export declare const userService: {
    getAll: () => Promise<User[]>;
    create: (user: User) => Promise<User>;
    login: (user: User) => Promise<{
        response: User;
        userId: string;
        config: {
            headers: {
                Authorization: string;
            };
        };
    }>;
    getCurrentUser: () => Promise<User | null>;
};
