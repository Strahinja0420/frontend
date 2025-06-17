import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Submitting form data:", form);
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      const navigate = useNavigate();

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/");
      alert("Registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };
  return <div className="register-form w-1/4 bg-white px-[8px] py-[16px] shadow-lg flex flex-col items-center h-full gap-[16px]">
            <Link to={"/"}>
              <img
                className="px-[8px] py-[16px]"
                src="src/assets/images/Logo.png"
              />
            </Link>

            <form onSubmit={handleSubmit} className="w-full space-y-4 flex-grow flex flex-col justify-stretch px-[8px] py-[16px]">
              <div className="flex flex-col items-center">
                <h2 className="font-extrabold text-xl ">Hello!</h2>
                <p className="mb-8 text-center text-gray-600">
                  Please enter your details
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col min-w-0 gap-1">
                  <p>Name</p>
                  <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    className="flex-1 border min-h-[40px] min-w-0  rounded-[16px] px-4 py-2"
                  />
                </div>
                <div className="flex flex-col min-w-0 gap-1">
                  <p>Surname</p>
                  <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                    type="text"
                    placeholder="Surname"
                    className="flex-1 border min-h-[40px] min-w-0  rounded-[16px] px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <p>Email</p>
                <input
                name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="E-mail"
                  className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
                />
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <p>Password</p>
                <input
                name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
                />
              </div>
              <div className="flex flex-col min-w-0 gap-1">
                <p>Repeat Password</p>
                <input
                name="repeatPassword"
                  value={form.repeatPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Repeat password"
                  className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full text-primary font-bold px-[16px] py-[8px] rounded-[16px] bg-(--primary-yellow) hover:bg-(--hover-yellow) cursor-pointer "
              >
                Sign up
              </button>
              <p className="mt-auto text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="font-bold">
                  Log in
                </Link>
              </p>
            </form>
          </div>
};

export default RegisterForm;
