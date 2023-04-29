"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function NavBar() {
    return (React.createElement("nav", { className: "bg-purple-600 py-4" },
        React.createElement("ul", { className: "flex justify-center" },
            React.createElement("li", { className: "mr-6" },
                React.createElement(react_router_dom_1.Link, { to: "/", className: "text-white hover:text-gray-300" }, "Home")),
            React.createElement("li", { className: "mr-6" },
                React.createElement(react_router_dom_1.Link, { to: "/posts", className: "text-white hover:text-gray-300" }, "Posts")),
            React.createElement("li", { className: "mr-6" },
                React.createElement(react_router_dom_1.Link, { to: "/trips", className: "text-white hover:text-gray-300" }, "Trips")),
            React.createElement("li", { className: "mr-6" },
                React.createElement(react_router_dom_1.Link, { to: "/signup", className: "text-white hover:text-gray-300" }, "Signup")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/login", className: "text-white hover:text-gray-300" }, "Login")))));
}
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map