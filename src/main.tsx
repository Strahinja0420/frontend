import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Profile from "./pages/Profile.tsx";
import Auctions from "./pages/Auctions.tsx";
import AuctionDetails from "./pages/AuctionDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgotpass" element={<ForgotPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/auctions" element={<Auctions />}></Route>
        <Route path="/auction/:1" element={<AuctionDetails />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
