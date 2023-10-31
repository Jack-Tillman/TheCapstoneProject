import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { HomePage } from "./HomePage";
import { GamesPage } from "./GamesPage";
import { MerchPage } from "./MerchPage";
import { HardwarePage } from "./HardwarePage";
import { Dashboard } from "./Dashboard";

const MainSection = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/games" element={<GamesPage />}/>
                <Route path="/hardware" element={<HardwarePage />} />
                <Route path="/merch" element={<MerchPage />}/>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default MainSection;