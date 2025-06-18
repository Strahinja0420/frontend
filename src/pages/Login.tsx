import React from "react";
import "../styles/Register.css";
import LoginForm from "../components/auth/LoginForm";
import CardGroup from "../components/cards/CardGroup";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex overflow-hidden w-full h-full">
        <div className="w-3/4 flex items-center justify-center p-8">
          <CardGroup />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
