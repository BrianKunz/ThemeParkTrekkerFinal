/* eslint-disable no-unused-vars */
import * as React from "react";
import { useCreateUser } from "./useCreateUser";
import NavBar from "../../NavBar/NavBar";

export default function CreateUser() {
  const { formInputs, handleFormChange, handleSubmit } = useCreateUser();

  return (
    <div className="bg-blue-200 min-h-screen">
      <NavBar />
      <div className="mx-auto w-1/2 mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              name="username"
              value={formInputs.username}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formInputs.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formInputs.password}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
