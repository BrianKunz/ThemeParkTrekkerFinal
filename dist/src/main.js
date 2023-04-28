"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = tslib_1.__importDefault(require("express"));
const user_controller_1 = tslib_1.__importDefault(require("./controllers/user.controller"));
const post_controller_1 = tslib_1.__importDefault(require("./controllers/post.controller"));
const trip_controller_1 = tslib_1.__importDefault(require("./controllers/trip.controller"));
const comment_controller_1 = tslib_1.__importDefault(require("./controllers/comment.controller"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const session = require("express-session");
// import session from "express-session";
const secret = process.env.SESSION_SECRET || "default-secret";
const PORT = 3001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
// app.use(sessionMiddleware);
app.use("/users", user_controller_1.default);
app.use("/posts", post_controller_1.default);
app.use("/trips", trip_controller_1.default);
app.use("/comments", comment_controller_1.default);
app.get("/", (_, res) => {
    res.redirect("/posts");
});
app.listen(PORT, () => {
    console.log(`Server is starting 🚀 on PORT: ${PORT}`);
});
//# sourceMappingURL=main.js.map