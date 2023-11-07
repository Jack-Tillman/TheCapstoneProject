import { Link } from "react-router-dom";
import { useEffect } from "react";

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
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/hardware">Hardware</Link>
      <Link to="/merch">Merchandise</Link>
      {!token && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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
            Logout
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
