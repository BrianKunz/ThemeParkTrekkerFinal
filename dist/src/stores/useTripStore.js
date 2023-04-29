"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTripStore = void 0;
const tslib_1 = require("tslib");
const zustand_1 = require("zustand");
const tripService_1 = require("../services/tripService");
const userService_1 = require("../services/userService");
exports.useTripStore = (0, zustand_1.create)((set, get) => ({
    trips: [],
    user: null,
    getAllTrips: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = get();
            console.log(user);
            const trips = yield tripService_1.tripService.getAll();
            const filteredTrips = trips.filter((trip) => user && trip.user === user.id);
            set({ trips: filteredTrips });
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOneTrip: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const trip = yield tripService_1.tripService.getOne(id);
            set({ trips: [trip] });
        }
        catch (error) {
            console.error(error);
        }
    }),
    createNewTrip: (trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllTrips } = get();
            const user = yield userService_1.userService.getCurrentUser();
            yield tripService_1.tripService.create(Object.assign(Object.assign({}, trip), { user: user !== null && user !== void 0 ? user : undefined }));
            yield getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    }),
    updateTrip: (trip) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield tripService_1.tripService.update(trip.id, trip);
            yield get().getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    }),
    deleteTrip: (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield tripService_1.tripService.delete(id);
            yield get().getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    }),
    setUser: (user) => {
        set({ user });
    },
}));
//# sourceMappingURL=useTripStore.js.map