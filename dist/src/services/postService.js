"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const baseURL = "https://themeparktrekker.herokuapp.com/posts/";
exports.postService = {
    getAll: async () => {
        const response = await axios_1.default.get(baseURL);
        return response.data;
    },
    getOne: async (id) => {
        const response = await axios_1.default.get(baseURL + id);
        return response.data;
    },
    create: async (post) => {
        const response = await axios_1.default.post(baseURL, post);
        return response.data;
    },
    update: async (id, post) => {
        const response = await axios_1.default.put(baseURL + id, post);
        return response.data;
    },
    delete: async (id) => {
        await axios_1.default.delete(baseURL + id);
    },
};
//# sourceMappingURL=postService.js.map