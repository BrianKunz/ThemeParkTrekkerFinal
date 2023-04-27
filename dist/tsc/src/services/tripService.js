import { __awaiter } from "tslib";
import axios from "axios";
const baseURL = "https://themeparktrekker.herokuapp.com/trips/";
export const tripService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        console.log(token); // Log the token to the console
        const response = yield axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    create: (trip) => __awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios.post(baseURL, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    update: (id, trip) => __awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios.put(baseURL + id, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        yield axios.delete(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }),
};
//# sourceMappingURL=tripService.js.map