import React from "react";
import { useCreateTrip } from "./useCreateTrip";
import { DayPicker } from "react-day-picker";

export default function CreateTrip() {
  const { formInputs, handleFormChange, handleSubmit, setFormInputs } =
    useCreateTrip();

  return (
    <form onSubmit={handleSubmit} method="POST">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formInputs.title}
        onChange={handleFormChange}
        required
      />
      <label htmlFor="start_date">Start Date</label>
      <DayPicker
        selected={formInputs.start_date}
        onDayClick={(date) => {
          if (date !== null) {
            setFormInputs({ ...formInputs, start_date: date });
          }
        }}
        required
      />
      <DayPicker
        selected={formInputs.end_date}
        onDayClick={(date) => {
          if (date !== null) {
            setFormInputs({ ...formInputs, end_date: date });
          }
        }}
        required
      />

      <label htmlFor="flight">Flight Info</label>
      <input
        type="text"
        name="flight"
        value={formInputs.flight}
        onChange={handleFormChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
