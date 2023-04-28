import React, { useState } from "react";
import { useTripStore } from "../../stores/useTripStore";
import { Trip as TripEntity } from "../../entities/Trip.entity";
import { User } from "../../entities/User.entity";

export interface TripProps {
  key?: string;
  trip: TripEntity;
  user?: User | undefined;
}

export const Trip: React.FC<TripProps> = ({
  trip: { id, date, title, start_date, end_date, flight },
  user,
}) => {
  const { updateTrip, deleteTrip } = useTripStore();
  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { name, value },
  }) => {
    console.log({ value });
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await updateTrip({
        id,
        user,
        date,
        title,
        start_date,
        end_date,
        flight,
        [name]: value,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!id) {
      return;
    }
    deleteTrip(id);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    console.log("Save button clicked");
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await updateTrip({
        id,
        user,
        date,
        title,
        start_date,
        end_date,
        flight,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 shadow-md rounded-md p-4 my-4 mx-auto w-full lg:w-3/4 xl:w-1/2">
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <p className="text-sm mb-2">
        Start Date: {new Date(start_date).toLocaleDateString()}
      </p>
      <p className="text-sm mb-2">
        End Date: {new Date(end_date).toLocaleDateString()}
      </p>
      <p className="text-sm mb-4">Flight: {flight}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleDelete}
      >
        Delete
      </button>
      <br />
      <input
        className="border rounded py-2 px-3 mb-2"
        name="title"
        type="text"
        onChange={handleChange}
        value={title}
      />
      <br />
      <input
        className="border rounded py-2 px-3 mb-2"
        name="start_date"
        type="date"
        onChange={handleChange}
        value={start_date.toISOString().substr(0, 10)}
      />
      <br />
      <input
        className="border rounded py-2 px-3 mb-2"
        name="end_date"
        type="date"
        onChange={handleChange}
        value={end_date.toISOString().substr(0, 10)}
      />
      <br />
      <input
        className="border rounded py-2 px-3 mb-4"
        name="flight"
        type="text"
        onChange={handleChange}
        value={flight}
      />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
