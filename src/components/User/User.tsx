import React from "react";
import CreateUser from "./CreateUser/CreateUser";
import LoginUser from "./LoginUser/LoginUser";

export const User: React.FC = () => {
  return (
    <div>
      <CreateUser />
      <LoginUser />
    </div>
  );
};
