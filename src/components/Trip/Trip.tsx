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
    <div>
      <h4>{title}</h4>
      <p>Start Date: {new Date(start_date).toLocaleDateString()}</p>
      <p>End Date: {new Date(end_date).toLocaleDateString()}</p>
      <p>Flight: {flight}</p>
      <button onClick={handleDelete}>Delete</button>
      <br />
      <input name="title" type="text" onChange={handleChange} value={title} />
      <br />
      <input
        name="start_date"
        type="date"
        onChange={handleChange}
        value={start_date.toISOString().substr(0, 10)}
      />
      <br />
      <input
        name="end_date"
        type="date"
        onChange={handleChange}
        value={end_date.toISOString().substr(0, 10)}
      />
      <br />
      <input name="flight" type="text" onChange={handleChange} value={flight} />
      <br />
      <button disabled={loading} onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};
