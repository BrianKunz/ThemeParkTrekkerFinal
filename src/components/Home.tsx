/* eslint-disable no-unused-vars */
import * as React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Site!</h1>
      <p>Please select an option below:</p>
      <ul>
        <li>
          <Link to="/posts">View Posts</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
