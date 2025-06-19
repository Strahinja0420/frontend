import React from "react";
import "../styles/Register.css";
import RegisterForm from "../components/auth/RegisterForm";
import CardGroup from "../components/cards/CardGroup";

const Register: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex w-full h-full overflow-hidden ">
          <div className="flex items-center justify-center w-3/4 p-8">
            <CardGroup />
          </div>

          {/* {sampleAuction.map((a) => (
            <Card key={a.id} auction={a} /> ----->  later add mapping for random 4 auctions
            ))} */}

          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
