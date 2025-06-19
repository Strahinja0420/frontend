import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  //TODO promeni native react funkcionalnost u react hook form.

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.clear();
      localStorage.setItem("token", data.access_token); //-----mozes cookie da koristis guglaj

      navigate("/profile");
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <div className="register-form w-1/4 bg-white px-[8px] py-[16px] shadow-lg flex flex-col items-center h-full gap-[16px]">
        <Link to={"/"}>
          <img
            className="px-[8px] py-[16px]"
            src="src/assets/images/Logo.png"
            alt="logo"
          />
        </Link>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 flex-grow flex flex-col justify-stretch px-[8px] py-[16px] pt-[60px]"
        >
          <div className="flex flex-col items-center">
            <h2 className="font-extrabold text-xl">Welcome back!</h2>
            <p className="mb-8 text-center text-gray-600">
              Please enter your details
            </p>
          </div>
          <div className="flex flex-col min-w-0 gap-1">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full border min-h-[40px] rounded-[16px] px-4 py-2"
            />
          </div>
          <div className="flex flex-col min-w-0 gap-1">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border min-h-[40px] rounded-[16px] px-4 py-2"
            />
          </div>
          <div className="flex w-full justify-end">
            <Link to={"/forgotpass"}>
              <p className="text-gray-600 text-sm">Forgot password?</p>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full primary-yellow-bg text-primary font-bold px-[16px] py-[8px] rounded-[16px] hover:bg-yellow-400"
          >
            Login
          </button>
          <p className="mt-auto text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <Link to={"/register"} className="font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
