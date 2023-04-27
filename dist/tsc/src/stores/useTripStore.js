import { __awaiter } from "tslib";
import { create } from "zustand";
import { tripService } from "../services/tripService";
import { userService } from "../services/userService";
export const useTripStore = create((set, get) => ({
    trips: [],
    user: userService.getCurrentUser(),
    getAllTrips: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user } = get();
            console.log(user);
            const trips = yield tripService.getAll();
            const filteredTrips = trips.filter((trip) => user && trip.user === user.id);
            set({ trips: filteredTrips });
        }
        catch (error) {
            console.error(error);
        }
    }),
    getOneTrip: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trip = yield tripService.getOne(id);
            set({ trips: [trip] });
        }
        catch (error) {
            console.error(error);
        }
    }),
    createNewTrip: (trip) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { getAllTrips, user } = get();
            yield tripService.create(Object.assign(Object.assign({}, trip), { user: user !== null && user !== void 0 ? user : undefined }));
            yield getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    }),
    updateTrip: (trip) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield tripService.update(trip.id, trip);
            yield get().getAllTrips();
        }
        catch (error) {
            console.error(error);
        }
    }),
    deleteTrip: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield tripService.delete(id);
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