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
        document.cookie = `accessToken=${token}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios_1.default.defaults.headers.common = config.headers;
        return { response: response.data, userId, config: config };
    }),
    getCurrentUser: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "accessToken") {
                const token = decodeURIComponent(value);
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                axios_1.default.defaults.headers.common = config.headers;
                return axios_1.default.get(`${baseURL}me`).then((response) => response.data);
            }
        }
        return null;
    }),
};
//# sourceMappingURL=userService.js.map