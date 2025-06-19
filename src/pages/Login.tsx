import React from "react";
import "../styles/Register.css";
import LoginForm from "../components/auth/LoginForm";
import CardGroup from "../components/cards/CardGroup";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex w-full h-full overflow-hidden">
        <div className="flex items-center justify-center w-3/4 p-8">
          <CardGroup />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
