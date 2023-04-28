"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useCreateUser_1 = require("./useCreateUser");
const NavBar_1 = tslib_1.__importDefault(require("../../NavBar/NavBar"));
function CreateUser() {
    const { formInputs, handleFormChange, handleSubmit } = (0, useCreateUser_1.useCreateUser)();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("form", { onSubmit: handleSubmit, method: "POST" },
            react_1.default.createElement("label", { htmlFor: "username" }, "Username"),
            react_1.default.createElement("input", { type: "username", name: "username", value: formInputs.username, onChange: handleFormChange, required: true }),
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("input", { type: "email", name: "email", value: formInputs.email, onChange: handleFormChange, required: true }),
            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
            react_1.default.createElement("input", { type: "password", name: "password", value: formInputs.password, onChange: handleFormChange, required: true }),
            react_1.default.createElement("button", { type: "submit" }, "Sign Up"))));
}
exports.default = CreateUser;
//# sourceMappingURL=CreateUser.js.map