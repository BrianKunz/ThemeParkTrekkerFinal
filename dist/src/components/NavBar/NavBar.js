"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function NavBar() {
    return (React.createElement("nav", null,
        React.createElement("ul", null,
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/posts" }, "Posts")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/trips" }, "Trips")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/signup" }, "Signup")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: "/login" }, "Login")))));
}
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map