import React, { useState } from "react";
import Card from "../components/Card/Card";

const sampleAuction = {
  name: "Faking rakun",
  price: 100,
  image: "src/assets/images/download.jpg",
  endTime: "2025-12-31T23:59:59.000Z",
  edit: false,
};

const Register: React.FC = () => {
  return <Card auction={sampleAuction} />;
};

export default Register;
