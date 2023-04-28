"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/trips/";
exports.tripService = {
    getAll: async () => {
        const token = sessionStorage.getItem("accessToken");
        console.log(token); // Log the token to the console
        const response = await axios_1.default.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
    },
    getOne: async (id) => {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios_1.default.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    create: async (trip) => {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios_1.default.post(baseURL, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    update: async (id, trip) => {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios_1.default.put(baseURL + id, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
    delete: async (id) => {
        const token = sessionStorage.getItem("accessToken");
        await axios_1.default.delete(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
//# sourceMappingURL=tripService.js.map