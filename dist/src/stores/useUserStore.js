"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
const tslib_1 = require("tslib");
const zustand_1 = require("zustand");
const userService_1 = require("../services/userService");
exports.useUserStore = (0, zustand_1.create)(() => ({
    users: [],
    currentUser: {
        response: null,
        config: {},
    },
    createNewUser: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(user);
            const response = yield userService_1.userService.create(user);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }),
    login: (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { response, config } = yield userService_1.userService.login(user);
            exports.useUserStore.setState({ currentUser: { response, config } });
        }
        catch (error) {
            console.error(error);
        }
    }),
}));
//# sourceMappingURL=useUserStore.js.map