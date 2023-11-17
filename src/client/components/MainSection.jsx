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

const MainSection = ({ token, setToken }) => {
  const [productStripe, setProductStripe] = useState(null);
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
          element={<StorePage productStripe={productStripe} setProductStripe={setProductStripe}/>}
        />
        <Route 
          path="/store/details"
          element={<SingleProduct productStripe={productStripe} setProductStripe={setProductStripe}/>}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* <Route path="/games" element={<GamesPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/merch" element={<MerchPage />} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default MainSection;