import { __awaiter } from "tslib";
import { create } from "zustand";
import { userService } from "../services/userService";
export const useUserStore = create(() => ({
    users: [],
    currentUser: null,
    createNewUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(user);
            const response = yield userService.create(user);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }),
    login: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(user);
            const loggedInUser = yield userService.login(user);
            console.log(loggedInUser);
            useUserStore.setState({ currentUser: loggedInUser });
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=useUserStore.js.map