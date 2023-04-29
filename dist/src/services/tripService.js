"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/trips/";
exports.tripService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))) === null || _a === void 0 ? void 0 : _a.split("=")[1];
        console.log(token);
        const response = yield axios_1.default.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
    }),
    getOne: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const token = (_b = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))) === null || _b === void 0 ? void 0 : _b.split("=")[1];
        const response = yield axios_1.default.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    create: (trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const token = (_c = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))) === null || _c === void 0 ? void 0 : _c.split("=")[1];
        const response = yield axios_1.default.post(baseURL, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    update: (id, trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const token = (_d = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))) === null || _d === void 0 ? void 0 : _d.split("=")[1];
        const response = yield axios_1.default.put(baseURL + id, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    delete: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const token = (_e = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))) === null || _e === void 0 ? void 0 : _e.split("=")[1];
        yield axios_1.default.delete(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }),
};
//# sourceMappingURL=tripService.js.map