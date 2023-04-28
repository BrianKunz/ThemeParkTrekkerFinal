"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const CreateUser_1 = tslib_1.__importDefault(require("./CreateUser/CreateUser"));
const LoginUser_1 = tslib_1.__importDefault(require("./LoginUser/LoginUser"));
const User = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(CreateUser_1.default, null),
        react_1.default.createElement(LoginUser_1.default, null)));
};
exports.User = User;
//# sourceMappingURL=User.js.map