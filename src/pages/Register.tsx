import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import Card from "../components/card/Card";

const sampleAuction = {
  name: "Faking rakun",
  price: 100,
  image: "src/assets/images/download.jpg",
  endTime: "2025-12-31T23:59:59.000Z",
  edit: false,
};

const auctions = Array(4)
  .fill(sampleAuction)
  .map((item, index) => ({
    ...item,
    id: index + 1, // ensure unique ids for keys
  }));

const Register: React.FC = () => {
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
      console.log('Submitting form data:', form);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registered successfully!");
    } catch (error: any) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex overflow-hidden w-full h-full ">
          <div className="w-3/4 flex items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              {auctions.map((a) => (
                <Card key={a.id} auction={a} />
              ))}
            </div>
          </div>

          {/* {sampleAuction.map((a) => (
            <Card key={a.id} auction={a} /> ----->  later add mapping for random 4 auctions
            ))} */}

          <div className="register-form w-1/4 bg-white px-[8px] py-[16px] shadow-lg flex flex-col items-center h-full gap-[16px]">
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
                className="w-full primary-yellow-bg text-primary font-bold px-[16px] py-[8px] rounded-[16px] hover:bg-yellow-400 "
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
        </div>
      </div>
    </>
  );
};

export default Register;
