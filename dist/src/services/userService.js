"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const node_localstorage_1 = require("node-localstorage");
const baseURL = "https://themeparktrekker.herokuapp.com/users/";
const localStorage = new node_localstorage_1.LocalStorage("./scratch");
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
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios_1.default.defaults.headers.common = config.headers;
        return { response: response.data, userId, config: config };
    }),
    getCurrentUser: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const userString = localStorage.getItem("user");
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