"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTripStore = void 0;
const zustand_1 = require("zustand");
const tripService_1 = require("../services/tripService");
const userService_1 = require("../services/userService");
exports.useTripStore = (0, zustand_1.create)((set, get) => ({
    trips: [],
    user: null,
    getAllTrips: async () => {
        try {
            const { user } = get();
            console.log(user);
            const trips = await tripService_1.tripService.getAll();
            const filteredTrips = trips.filter((trip) => user && trip.user === user.id);
            set({ trips: filteredTrips });
        }
        catch (error) {
            console.error(error);
        }
    },
    getOneTrip: async (id) => {
        try {
            const trip = await tripService_1.tripService.getOne(id);
            set({ trips: [trip] });
        }
        catch (error) {
            console.error(error);
        }
    },
    createNewTrip: async (trip) => {
        try {
            const { getAllTrips } = get();
            const user = await userService_1.userService.getCurrentUser();
            await tripService_1.tripService.create({ ...trip, user: user ?? undefined });
            await getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    },
    updateTrip: async (trip) => {
        try {
            await tripService_1.tripService.update(trip.id, trip);
            await get().getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    },
    deleteTrip: async (id) => {
        try {
            await tripService_1.tripService.delete(id);
            await get().getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    },
    setUser: (user) => {
        set({ user });
    },
}));
//# sourceMappingURL=useTripStore.js.map