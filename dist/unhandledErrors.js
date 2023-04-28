"use strict";
process.on("uncaughtException", (err) => {
    console.error("Unhandled Exception:", err);
});
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Promise rejection:", reason);
});
//# sourceMappingURL=unhandledErrors.js.map