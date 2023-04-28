"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreateUser_1 = require("./useCreateUser");
const NavBar_1 = tslib_1.__importDefault(require("../../NavBar/NavBar"));
function CreateUser() {
    const { formInputs, handleFormChange, handleSubmit } = (0, useCreateUser_1.useCreateUser)();
    return (React.createElement("div", null,
        React.createElement(NavBar_1.default, null),
        React.createElement("form", { onSubmit: handleSubmit, method: "POST" },
            React.createElement("label", { htmlFor: "username" }, "Username"),
            React.createElement("input", { type: "username", name: "username", value: formInputs.username, onChange: handleFormChange, required: true }),
            React.createElement("label", { htmlFor: "email" }, "Email"),
            React.createElement("input", { type: "email", name: "email", value: formInputs.email, onChange: handleFormChange, required: true }),
            React.createElement("label", { htmlFor: "password" }, "Password"),
            React.createElement("input", { type: "password", name: "password", value: formInputs.password, onChange: handleFormChange, required: true }),
            React.createElement("button", { type: "submit" }, "Sign Up"))));
}
exports.default = CreateUser;
//# sourceMappingURL=CreateUser.js.map