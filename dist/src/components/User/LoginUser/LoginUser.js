"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useLoginUser_1 = require("./useLoginUser");
const NavBar_1 = tslib_1.__importDefault(require("../../NavBar/NavBar"));
function LoginUser() {
    const { handleLoginSubmit, handleLoginFormChange, loginFormInputs, loadingLogin, } = (0, useLoginUser_1.useLoginUser)();
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleLoginSubmit();
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("form", { onSubmit: handleFormSubmit },
            react_1.default.createElement("h2", null, "Login"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "username" }, "Username"),
                react_1.default.createElement("input", { type: "text", name: "username", id: "username", value: loginFormInputs.username, onChange: handleLoginFormChange })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
                react_1.default.createElement("input", { type: "password", name: "password", id: "password", value: loginFormInputs.password, onChange: handleLoginFormChange })),
            react_1.default.createElement("button", { type: "submit", disabled: loadingLogin }, loadingLogin ? "Loading..." : "Log in"))));
}
exports.default = LoginUser;
//# sourceMappingURL=LoginUser.js.map