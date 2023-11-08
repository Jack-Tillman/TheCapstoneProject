import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { HomePage } from "./HomePage";
import { GamesPage } from "./GamesPage";
import { MerchPage } from "./MerchPage";
import { HardwarePage } from "./HardwarePage";
import { Dashboard } from "./Dashboard";
import { StorePage } from "./StorePage";

const MainSection = ({ token, setToken }) => {
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