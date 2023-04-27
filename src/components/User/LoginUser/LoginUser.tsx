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
    <div>
      <NavBar />
      <form onSubmit={handleFormSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={loginFormInputs.username}
            onChange={handleLoginFormChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginFormInputs.password}
            onChange={handleLoginFormChange}
          />
        </div>
        <button type="submit" disabled={loadingLogin}>
          {loadingLogin ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
