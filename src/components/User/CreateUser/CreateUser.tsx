import React from "react";
import { useCreateUser } from "./useCreateUser";
import NavBar from "../../NavBar/NavBar";

export default function CreateUser() {
  const { formInputs, handleFormChange, handleSubmit } = useCreateUser();
  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} method="POST">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          value={formInputs.username}
          onChange={handleFormChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formInputs.email}
          onChange={handleFormChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formInputs.password}
          onChange={handleFormChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
