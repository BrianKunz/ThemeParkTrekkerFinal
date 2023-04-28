import { User } from "../entities/User.entity";
import { Trip } from "../entities/Trip.entity";
interface TripStore {
    trips: Trip[];
    user: User | null;
    getAllTrips: () => Promise<void>;
    getOneTrip: (id: string) => Promise<void>;
    createNewTrip: (trip: Trip) => Promise<void>;
    updateTrip: (trip: Trip) => Promise<void>;
    deleteTrip: (id: string) => Promise<void>;
    setUser: (user: User | null) => void;
}
export declare const useTripStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TripStore>>;
export {};
