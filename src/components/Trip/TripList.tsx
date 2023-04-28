import React, { useEffect } from "react";
import { useTripStore } from "../../stores/useTripStore";
import { Trip } from "./Trip";
import CreateTrip from "./CreateTrip/CreateTrip";
import NavBar from "../NavBar/NavBar";

export default function TripList() {
  const { trips, getAllTrips, user } = useTripStore();

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Trips</h1>
      <CreateTrip />
      {trips.length > 0 ? (
        trips.map((trip) => {
          return <Trip key={trip.id} trip={trip} user={user ?? undefined} />; // <-- pass the user prop
        })
      ) : (
        <p>No trips planned yet!</p>
      )}
    </div>
  );
}
