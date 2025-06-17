import React from "react";
import "../styles/Register.css";
import Card from "../components/cards/Card";
import { Link } from "react-router-dom";

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

const ForgotPassword: React.FC = () => {
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

            <form className="w-full space-y-4 flex-grow flex flex-col justify-stretch px-[8px] py-[16px]">
              <div className="flex flex-col items-center">
                <h2 className="font-extrabold text-xl ">Forgot password?</h2>
                <p className="mb-8 text-center text-gray-600">
                  No worries, we will send you reset instructions.
                </p>
              </div>

              <div className="flex flex-col min-w-0 gap-1">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full primary-yellow-bg text-primary font-bold px-[16px] py-[8px] rounded-[16px] hover:bg-yellow-400 "
              >
                Reset password
              </button>
              <div className="flex justify-center pt-[8px]">
                <img
                  className="rotate-180"
                  src="src/assets/images/arrow-right.png"
                />
                <Link to={"/login"}>
                  <p className="text-12 text-(--text-gray)">Back to login</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
