"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useTripStore_1 = require("../../stores/useTripStore");
const Trip_1 = require("./Trip");
const CreateTrip_1 = tslib_1.__importDefault(require("./CreateTrip/CreateTrip"));
const NavBar_1 = tslib_1.__importDefault(require("../NavBar/NavBar"));
function TripList() {
    const { trips, getAllTrips, user } = (0, useTripStore_1.useTripStore)();
    (0, react_1.useEffect)(() => {
        getAllTrips();
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement("h1", null, "Trips"),
        react_1.default.createElement(CreateTrip_1.default, null),
        trips.length > 0 ? (trips.map((trip) => {
            return react_1.default.createElement(Trip_1.Trip, { key: trip.id, trip: trip, user: user !== null && user !== void 0 ? user : undefined }); // <-- pass the user prop
        })) : (react_1.default.createElement("p", null, "No trips planned yet!"))));
}
exports.default = TripList;
//# sourceMappingURL=TripList.js.map