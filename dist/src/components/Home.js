"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function HomePage() {
    return (React.createElement("div", { className: "bg-blue-100 p-4" },
        React.createElement("h1", { className: "text-3xl font-bold mb-4 text-center" }, "Welcome to the Theme Park Trekker!"),
        React.createElement("p", { className: "text-lg mb-2 text-center" }, "Please select an option below:"),
        React.createElement("ul", { className: "flex flex-col items-center" },
            React.createElement("li", { className: "my-4" },
                React.createElement(react_router_dom_1.Link, { to: "/posts", className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "View Posts")),
            React.createElement("li", { className: "my-4" },
                React.createElement(react_router_dom_1.Link, { to: "/login", className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Login")),
            React.createElement("li", { className: "my-4" },
                React.createElement(react_router_dom_1.Link, { to: "/signup", className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" }, "Signup")))));
}
exports.default = HomePage;
//# sourceMappingURL=Home.js.map