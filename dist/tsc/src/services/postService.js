import { __awaiter } from "tslib";
import axios from "axios";
const baseURL = "https://themeparktrekker.herokuapp.com/posts/";
export const postService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(baseURL);
        return response.data;
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(baseURL + id);
        return response.data;
    }),
    create: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(baseURL, post);
        return response.data;
    }),
    update: (id, post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.put(baseURL + id, post);
        return response.data;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios.delete(baseURL + id);
    }),
};
//# sourceMappingURL=postService.js.map