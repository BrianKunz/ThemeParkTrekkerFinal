"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = tslib_1.__importDefault(require("./App"));
if (typeof window !== "undefined") {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        const root = (0, client_1.createRoot)(rootElement);
        root.render(react_1.default.createElement(react_1.default.StrictMode, null,
            react_1.default.createElement(App_1.default, null)));
    }
    else {
        console.error("Cannot find 'root' element in the DOM.");
    }
}
//# sourceMappingURL=index.js.map