"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};
exports.getCookie = getCookie;
//# sourceMappingURL=cookie.js.map