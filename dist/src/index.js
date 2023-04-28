"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const client_1 = tslib_1.__importDefault(require("react-dom/client"));
const App_1 = tslib_1.__importDefault(require("./App"));
require("./index.css");
const react_router_dom_1 = require("react-router-dom");
require("tslib");
client_1.default.createRoot(document.getElementById("root")).render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_1.default, null))));
//# sourceMappingURL=index.js.map