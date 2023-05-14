/* eslint-disable no-unused-vars */
import * as React from "react";
import { useCreateTrip } from "./useCreateTrip";
import { DayPicker } from "react-day-picker";

function CreateTrip() {
  const { formInputs, handleFormChange, handleSubmit, setFormInputs } =
    useCreateTrip();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-center mb-8 text-purple-700">
        Create a Trip
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        className="w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formInputs.title}
            onChange={handleFormChange}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="start_date"
            className="block text-gray-700 font-bold mb-2"
          >
            Start Date
          </label>
          <DayPicker
            selected={formInputs.start_date}
            onDayClick={(date) => {
              if (date !== null) {
                setFormInputs({ ...formInputs, start_date: date });
              }
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="end_date"
            className="block text-gray-700 font-bold mb-2"
          >
            End Date
          </label>
          <DayPicker
            selected={formInputs.end_date}
            onDayClick={(date) => {
              if (date !== null) {
                setFormInputs({ ...formInputs, end_date: date });
              }
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="flight"
            className="block text-gray-700 font-bold mb-2"
          >
            Flight Info
          </label>
          <input
            type="text"
            name="flight"
            value={formInputs.flight}
            onChange={handleFormChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTrip;
