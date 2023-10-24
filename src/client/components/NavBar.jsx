import { Link } from "react-router-dom"

//add search bar?

const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default NavBar;