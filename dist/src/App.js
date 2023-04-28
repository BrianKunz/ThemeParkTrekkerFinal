"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const TripList_1 = tslib_1.__importDefault(require("./components/Trip/TripList"));
const PostList_1 = tslib_1.__importDefault(require("./components/Post/PostList"));
const CreateUser_1 = tslib_1.__importDefault(require("./components/User/CreateUser/CreateUser"));
const LoginUser_1 = tslib_1.__importDefault(require("./components/User/LoginUser/LoginUser"));
const Post_1 = tslib_1.__importDefault(require("./components/Post/Post"));
const Home_1 = tslib_1.__importDefault(require("./components/Home"));
const App = () => {
    return (react_1.default.createElement("main", { className: "App" },
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/trips", element: react_1.default.createElement(TripList_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/posts", element: react_1.default.createElement(PostList_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/posts/:id", element: react_1.default.createElement(Post_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/signup", element: react_1.default.createElement(CreateUser_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(LoginUser_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/" }) })));
};
exports.default = App;
//# sourceMappingURL=App.js.map