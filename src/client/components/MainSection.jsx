import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"

const MainSection = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/games" />
                <Route path="/hardware" />
                <Route path="/merch" />
            </Routes>
        </div>
    )
}

export default MainSection;