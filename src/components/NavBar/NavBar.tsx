/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-purple-600 py-4">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/posts" className="text-white hover:text-gray-300">
            Posts
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/trips" className="text-white hover:text-gray-300">
            Trips
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
