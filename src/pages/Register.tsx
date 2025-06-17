import React from "react";
import "../styles/Register.css";
import Card from "../components/cards/Card";
import RegisterForm from "../components/auth/RegisterForm";

const sampleAuction = {
  title: "Faking rakun",
  buyNowPrice: 100,
  image: "src/assets/images/download.jpg",
  endTime: "2025-12-31T23:59:59.000Z",
  edit: false,
};

const auctions2 = Array(4)
  .fill(sampleAuction)
  .map((item, index) => ({
    ...item,
    id: index + 1, 
  }));

const Register: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex overflow-hidden w-full h-full ">
          <div className="w-3/4 flex items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              {auctions2.map((a) => (
                <Card key={a.id} auction={a} />
              ))}
            </div>
          </div>

          {/* {sampleAuction.map((a) => (
            <Card key={a.id} auction={a} /> ----->  later add mapping for random 4 auctions
            ))} */}

          <RegisterForm/>
        </div>
      </div>
    </>
  );
};

export default Register;
