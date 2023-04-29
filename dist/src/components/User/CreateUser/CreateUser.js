"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCreateUser_1 = require("./useCreateUser");
const NavBar_1 = tslib_1.__importDefault(require("../../NavBar/NavBar"));
function CreateUser() {
    const { formInputs, handleFormChange, handleSubmit } = (0, useCreateUser_1.useCreateUser)();
    return (React.createElement("div", { className: "bg-blue-200 min-h-screen" },
        React.createElement(NavBar_1.default, null),
        React.createElement("div", { className: "mx-auto w-1/2 mt-8 p-4 bg-white rounded-lg shadow-lg" },
            React.createElement("h2", { className: "text-3xl font-bold text-center mb-4" }, "Create Account"),
            React.createElement("form", { onSubmit: handleSubmit, method: "POST" },
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "username" }, "Username"),
                    React.createElement("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "username", type: "username", name: "username", value: formInputs.username, onChange: handleFormChange, required: true })),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "email" }, "Email"),
                    React.createElement("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "email", type: "email", name: "email", value: formInputs.email, onChange: handleFormChange, required: true })),
                React.createElement("div", { className: "mb-6" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2", htmlFor: "password" }, "Password"),
                    React.createElement("input", { className: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "password", type: "password", name: "password", value: formInputs.password, onChange: handleFormChange, required: true })),
                React.createElement("div", { className: "flex items-center justify-center" },
                    React.createElement("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "submit" }, "Sign Up"))))));
}
exports.default = CreateUser;
//# sourceMappingURL=CreateUser.js.map