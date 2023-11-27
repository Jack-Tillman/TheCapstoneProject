import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { HomePage } from "./HomePage";
import { Success } from "./Success";
import { Cancel } from "./Cancel";
// import { GamesPage } from "./GamesPage";
// import { MerchPage } from "./MerchPage";
// import { HardwarePage } from "./HardwarePage";
import { Dashboard } from "./Dashboard";
import { StorePage } from "./StorePage";
import { SingleProduct } from "./SingleProduct";
import { useState } from "react";

const MainSection = ({ token, setToken, admin, setAdmin, user, setUser }) => {

  return (
    <div className="">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={<Login token={token} setToken={setToken} />}
      />
      <Route
        path="/register"
        element={<Register token={token} setToken={setToken} />}
      />
      <Route 
        path="/store"
        element={<StorePage />}
      />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />

      {/* <Route path="/games" element={<GamesPage />} />
      <Route path="/hardware" element={<HardwarePage />} />
      <Route path="/merch" element={<MerchPage />} /> */}

      <Route path="/dashboard" element={<Dashboard token={token} setToken={setToken} admin={admin} setAdmin={setAdmin} user={user}/>} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </div>
  );
};

export default MainSection;
