import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("admin");
  
  const navigate = useNavigate();
  return (
    <>
      <div id="success-notification">
        <h1>Logged out!</h1>
        <p>Click below to return home</p>        
        <Link to="/"><Button variant="contained">Home</Button></Link>
      </div>
    </>
  );
};
