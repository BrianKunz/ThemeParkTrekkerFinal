"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const useTripStore_1 = require("../../stores/useTripStore");
const Trip_1 = require("./Trip");
const CreateTrip_1 = tslib_1.__importDefault(require("./CreateTrip/CreateTrip"));
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
function TripList() {
    const { trips, user, fetchCurrentUserAndTrips } = (0, useTripStore_1.useTripStore)();
    (0, react_1.useEffect)(() => {
        fetchCurrentUserAndTrips();
    }, [fetchCurrentUserAndTrips]);
    return (React.createElement("div", { className: "bg-white mx-auto px-4 sm:px-6 lg:px-8" },
        React.createElement(NavBar_1.default, null),
        React.createElement("h1", { className: "text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl" }, "Trips"),
        React.createElement(CreateTrip_1.default, null),
        trips.length > 0 ? (React.createElement("div", { className: "mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3" }, trips.map((trip) => (React.createElement(Trip_1.Trip, { key: trip.id, trip: trip, user: user !== null && user !== void 0 ? user : undefined }))))) : (React.createElement("p", { className: "mt-6 text-xl text-gray-500" }, "No trips planned yet!"))));
}
exports.default = TripList;
//# sourceMappingURL=TripList.js.map