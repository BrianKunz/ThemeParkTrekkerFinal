"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/comments/";
exports.commentService = {
    getAll: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(baseURL);
        return response.data;
    }),
    getOne: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(baseURL + id);
        return response.data;
    }),
    create: (comment) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(baseURL, comment);
        return response.data;
    }),
    update: (id, comment) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.put(baseURL + id, comment);
        return response.data;
    }),
    delete: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.delete(baseURL + id);
    }),
};
//# sourceMappingURL=commentService.js.map