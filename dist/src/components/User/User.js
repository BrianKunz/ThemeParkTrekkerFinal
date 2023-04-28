"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const CreateUser_1 = tslib_1.__importDefault(require("./CreateUser/CreateUser"));
const LoginUser_1 = tslib_1.__importDefault(require("./LoginUser/LoginUser"));
const User = () => {
    const [isLogin, setIsLogin] = (0, react_1.useState)(true);
    const toggleForm = () => {
        setIsLogin((prevState) => !prevState);
    };
    return (react_1.default.createElement("div", { className: "flex flex-col items-center" },
        isLogin ? react_1.default.createElement(LoginUser_1.default, null) : react_1.default.createElement(CreateUser_1.default, null),
        react_1.default.createElement("button", { className: "mt-4", onClick: toggleForm }, isLogin ? "Create an account" : "Login")));
};
exports.User = User;
//# sourceMappingURL=User.js.map