"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "/trips/";
exports.tripService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        console.log(token); // Log the token to the console
        const response = yield axios_1.default.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
    }),
    getOne: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios_1.default.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    create: (trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios_1.default.post(baseURL, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    update: (id, trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        const response = yield axios_1.default.put(baseURL + id, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    delete: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = sessionStorage.getItem("accessToken");
        yield axios_1.default.delete(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }),
};
//# sourceMappingURL=tripService.js.map