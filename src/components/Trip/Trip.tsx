import React, { useState } from "react";
import { useTripStore } from "../../stores/useTripStore";

export interface TripProps {
  key?: string;
  trip: Trip;
  user?: User;
}

export const Trip: React.FC<TripProps> = ({
  trip: { id, date, title, start_date, end_date, flight },
  user,
}) => {
  const { updateTrip, deleteTrip } = useTripStore();
  const [loading, setLoading] = useState(false);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { value },
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
    //@ts-ignore
    deleteTrip(id);
  };

  return (
    <div>
      <h4>{title}</h4>
      {/* <p>{start_date}</p>
      <p>{end_date}</p> */}
      <p>{flight}</p>
    </div>
  );
};
