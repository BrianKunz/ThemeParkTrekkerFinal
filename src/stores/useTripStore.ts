import { create } from "zustand";
import { tripService } from "../services/tripService";
import { userService } from "../services/userService";
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

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  user: null,
  getAllTrips: async () => {
    try {
      const { user } = get();
      console.log(user);
      const trips = await tripService.getAll();
      const filteredTrips = trips.filter(
        (trip: Trip) => user && trip.user === user.id
      );
      set({ trips: filteredTrips });
    } catch (error) {
      console.error(error);
    }
  },
  getOneTrip: async (id) => {
    try {
      const trip = await tripService.getOne(id);
      set({ trips: [trip] });
    } catch (error) {
      console.error(error);
    }
  },
  createNewTrip: async (trip) => {
    try {
      const { getAllTrips } = get();
      const user = await userService.getCurrentUser();
      await tripService.create({ ...trip, user: user ?? undefined });
      await getAllTrips();
    } catch (error) {
      console.error(error);
    }
  },
  updateTrip: async (trip) => {
    try {
      await tripService.update(trip.id!, trip);
      await get().getAllTrips();
    } catch (error) {
      console.error(error);
    }
  },
  deleteTrip: async (id) => {
    try {
      await tripService.delete(id);
      await get().getAllTrips();
    } catch (error) {
      console.error(error);
    }
  },
  setUser: (user) => {
    set({ user });
  },
}));
