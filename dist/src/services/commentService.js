import { __awaiter } from "tslib";
import axios from "axios";
const baseURL = "https://themeparktrekker.herokuapp.com/comments/";
export const commentService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(baseURL);
        return response.data;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(baseURL + id);
        return response.data;
    }),
    create: (comment) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(baseURL, comment);
        return response.data;
    }),
    update: (id, comment) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.put(baseURL + id, comment);
        return response.data;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios.delete(baseURL + id);
    }),
};
//# sourceMappingURL=commentService.js.map