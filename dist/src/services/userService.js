"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "localhost:3001/users/";
exports.userService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(baseURL);
        return response.data;
    }),
    create: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${baseURL}signup`, user);
        return response.data;
    }),
    login: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${baseURL}login`, user);
        const token = response.data.token;
        const userId = response.data.user.id;
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userId", userId);
        return response.data;
    }),
    getCurrentUser: () => {
        const userString = sessionStorage.getItem("user");
        if (userString) {
            return JSON.parse(userString);
        }
        else {
            return null;
        }
    },
};
//# sourceMappingURL=userService.js.map