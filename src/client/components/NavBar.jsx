import { Link } from "react-router-dom"

//conditional render login/register if user is logged out
//don't render login/register is user is logged out
//render dashboard/logout if user is logged in

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/games">Games</Link>
            <Link to="/hardware">Hardware</Link>
            <Link to="/merch">Merchandise</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    )
}

export default NavBar;