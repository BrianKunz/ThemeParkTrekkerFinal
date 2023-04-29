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
export declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserStore>>;
export {};
