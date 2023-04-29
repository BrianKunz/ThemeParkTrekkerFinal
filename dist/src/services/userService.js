"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/users/";
exports.userService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(baseURL);
        return response.data;
    }),
    create: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${baseURL}signup`, user);
        console.log(response.data);
        return response.data;
    }),
    login: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${baseURL}login`, user);
        const token = response.data.token;
        const userId = response.data.user.id;
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userId", userId);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(config);
        axios_1.default.defaults.headers.common = config.headers;
        console.log(config.headers);
        return response.data;
    }),
    getCurrentUser: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const userString = sessionStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            return user;
        }
        else {
            return null;
        }
    }),
};
//# sourceMappingURL=userService.js.map