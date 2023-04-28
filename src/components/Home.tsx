/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to the Theme Park Trekker!
      </h1>
      <p className="text-lg mb-2 text-center">Please select an option below:</p>
      <ul className="flex flex-col items-center">
        <li className="my-4">
          <Link
            to="/posts"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Posts
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
