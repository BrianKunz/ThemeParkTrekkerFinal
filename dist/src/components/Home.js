"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function HomePage() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Welcome to the Site!"),
        React.createElement("p", null, "Please select an option below:"),
        React.createElement("ul", null,
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/posts" }, "View Posts")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/login" }, "Login")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/signup" }, "Signup")))));
}
exports.default = HomePage;
//# sourceMappingURL=Home.js.map