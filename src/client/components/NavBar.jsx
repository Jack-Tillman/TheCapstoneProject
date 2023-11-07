import { Link } from "react-router-dom";
import { useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

//conditional render login/register if user is logged out
//don't render login/register is user is logged out
//render dashboard/logout if user is logged in

const NavBar = ({ token, setToken }) => {
  useEffect(() => {
    async function renderNavbar() {
      const storageToken = sessionStorage.getItem("token");
      if (storageToken) {
        setToken(storageToken);
      } else {
        setToken(null);
      }
    }
    renderNavbar();
  }, [token]);

  return (
    <div className="navbar">
      <Link to="/">
      <IconButton aria-label="Home" color="primary">
        <HomeIcon />
      </IconButton>
      </Link>
      <Link to="/games">Games</Link>
      <Link to="/hardware">Hardware</Link>
      <Link to="/merch">Merchandise</Link>
      {!token && (
        <>
          <Link to="/login">
            <IconButton aria-label="Log in" color="primary">
              <LoginIcon />
            </IconButton>
          </Link>
        </>
      )}
      {token && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link
            to="/logout"
            onClick={() => {
              setToken(null);
            }}
          >
            <IconButton aria-label="Log out" color="primary">
              <LogoutIcon />
            </IconButton>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
