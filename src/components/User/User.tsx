import React, { useState } from "react";
import CreateUser from "./CreateUser/CreateUser";
import LoginUser from "./LoginUser/LoginUser";

export const User: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col items-center">
      {isLogin ? <LoginUser /> : <CreateUser />}
      <button className="mt-4" onClick={toggleForm}>
        {isLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );
};
