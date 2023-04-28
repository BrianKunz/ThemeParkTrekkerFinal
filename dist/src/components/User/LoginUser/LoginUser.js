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
    return (react_1.default.createElement("div", { className: "bg-gray-100 min-h-screen" },
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("div", { className: "mx-auto max-w-lg pt-20 pb-10 px-4" },
            react_1.default.createElement("h2", { className: "text-3xl font-semibold mb-4" }, "Login"),
            react_1.default.createElement("form", { onSubmit: handleFormSubmit, className: "space-y-4" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "username", className: "block text-gray-700 font-semibold mb-2" }, "Username"),
                    react_1.default.createElement("input", { type: "text", name: "username", id: "username", value: loginFormInputs.username, onChange: handleLoginFormChange, className: "w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500" })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "password", className: "block text-gray-700 font-semibold mb-2" }, "Password"),
                    react_1.default.createElement("input", { type: "password", name: "password", id: "password", value: loginFormInputs.password, onChange: handleLoginFormChange, className: "w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500" })),
                react_1.default.createElement("button", { type: "submit", disabled: loadingLogin, className: "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" }, loadingLogin ? "Loading..." : "Log in")))));
}
exports.default = LoginUser;
//# sourceMappingURL=LoginUser.js.map