"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
const zustand_1 = require("zustand");
const userService_1 = require("../services/userService");
exports.useUserStore = (0, zustand_1.create)(() => ({
    users: [],
    currentUser: null,
    createNewUser: async (user) => {
        try {
            console.log(user);
            const response = await userService_1.userService.create(user);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    },
    login: async (user) => {
        try {
            console.log(user);
            const loggedInUser = await userService_1.userService.login(user);
            console.log(loggedInUser);
            exports.useUserStore.setState({ currentUser: loggedInUser });
        }
        catch (error) {
            console.error(error);
        }
    },
}));
//# sourceMappingURL=useUserStore.js.map