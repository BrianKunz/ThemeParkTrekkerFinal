import { Trip } from "../entities/Trip.entity";
export declare const tripService: {
    getAll: () => Promise<Trip[]>;
    getOne: (id: string) => Promise<Trip>;
    create: (trip: Trip) => Promise<Trip>;
    update: (id: string, trip: Trip) => Promise<Trip>;
    delete: (id: string) => Promise<void>;
};
