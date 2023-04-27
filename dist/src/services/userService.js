import { __awaiter } from "tslib";
import axios from "axios";
const baseURL = "https://themeparktrekker.herokuapp.com/users/";
export const userService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(baseURL);
        return response.data;
    }),
    create: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(`${baseURL}signup`, user);
        return response.data;
    }),
    login: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(`${baseURL}login`, user);
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