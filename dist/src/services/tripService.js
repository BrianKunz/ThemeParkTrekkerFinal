"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/trips/";
exports.tripService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = getCookie("accessToken");
        const response = yield axios_1.default.get(baseURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    getOne: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = getCookie("accessToken");
        const response = yield axios_1.default.get(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    create: (trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = getCookie("accessToken");
        const response = yield axios_1.default.post(baseURL, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    update: (id, trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = getCookie("accessToken");
        const response = yield axios_1.default.put(baseURL + id, trip, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }),
    delete: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const token = getCookie("accessToken");
        yield axios_1.default.delete(baseURL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }),
};
function getCookie(name) {
    var _a;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(";").shift();
    }
    return null;
}
//# sourceMappingURL=tripService.js.map