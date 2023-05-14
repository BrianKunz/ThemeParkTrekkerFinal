"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const cookie_1 = tslib_1.__importDefault(require("cookie"));
const baseURL = "https://themeparktrekker.herokuapp.com/users/";
exports.userService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(baseURL);
        return response.data;
    }),
    create: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("User data: ", user);
            const response = yield axios_1.default.post(`${baseURL}signup`, user);
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            console.error("Error signing up: ", error);
            throw error;
        }
    }),
    login: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${baseURL}login`, user);
        console.log("Response:", response);
        if (!response.data.user) {
            throw new Error("User not found in the response data.");
        }
        const token = response.data.token;
        const userId = response.data.user.id;
        const options = { httpOnly: true };
        const cookies = cookie_1.default.serialize("accessToken", token, options);
        document.cookie = cookies;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios_1.default.defaults.headers.common = config.headers;
        return { response: response.data, userId, config: config };
    }),
    getCurrentUser: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const cookies = cookie_1.default.parse(document.cookie);
        const token = cookies["accessToken"];
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios_1.default.defaults.headers.common = config.headers;
            return axios_1.default.get(`${baseURL}me`).then((response) => response.data);
        }
        return null;
    }),
};
//# sourceMappingURL=userService.js.map