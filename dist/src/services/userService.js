"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/users/";
exports.userService = {
    getAll: async () => {
        const response = await axios_1.default.get(baseURL);
        return response.data;
    },
    create: async (user) => {
        const response = await axios_1.default.post(`${baseURL}signup`, user);
        return response.data;
    },
    login: async (user) => {
        const response = await axios_1.default.post(`${baseURL}login`, user);
        const token = response.data.token;
        const userId = response.data.user.id;
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userId", userId);
        return response.data;
    },
    getCurrentUser: async () => {
        const userString = sessionStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            return user;
        }
        else {
            return null;
        }
    },
};
//# sourceMappingURL=userService.js.map