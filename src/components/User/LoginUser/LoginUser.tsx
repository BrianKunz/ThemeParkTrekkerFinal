import React from "react";
import { useLoginUser } from "./useLoginUser";
import NavBar from "../../NavBar/NavBar";

export default function LoginUser() {
  const {
    handleLoginSubmit,
    handleLoginFormChange,
    loginFormInputs,
    loadingLogin,
  } = useLoginUser();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleLoginSubmit();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="mx-auto max-w-lg pt-20 pb-10 px-4">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginFormInputs.username}
              onChange={handleLoginFormChange}
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginFormInputs.password}
              onChange={handleLoginFormChange}
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loadingLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingLogin ? "Loading..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
