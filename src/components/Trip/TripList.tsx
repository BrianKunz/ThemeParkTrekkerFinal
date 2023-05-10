/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect } from "react";
import { useTripStore } from "../../stores/useTripStore";
import { Trip } from "./Trip";
import CreateTrip from "./CreateTrip/CreateTrip";
import NavBar from "../NavBar/NavBar";

export default function TripList() {
  const { trips, getAllTrips, user, fetchCurrentUserAndTrips } = useTripStore();

  useEffect(() => {
    getAllTrips();
  }, []);

  useEffect(() => {
    fetchCurrentUserAndTrips();
  }, [fetchCurrentUserAndTrips]);

  return (
    <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Trips
      </h1>
      <CreateTrip />
      {trips.length > 0 ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <Trip key={trip.id} trip={trip} user={user ?? undefined} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-xl text-gray-500">No trips planned yet!</p>
      )}
    </div>
  );
}
