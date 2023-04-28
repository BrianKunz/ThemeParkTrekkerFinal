"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function HomePage() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Welcome to the Site!"),
        react_1.default.createElement("p", null, "Please select an option below:"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/posts" }, "View Posts")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Login")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/signup" }, "Signup")))));
}
exports.default = HomePage;
//# sourceMappingURL=Home.js.map