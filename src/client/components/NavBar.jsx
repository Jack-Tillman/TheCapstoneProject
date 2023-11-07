import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button, Modal, Navbar } from 'react-bootstrap'
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { CartContext } from "../CartContext";
import { CartProduct } from "./CartProduct";


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

  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

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
            {/* <Navbar expand="sm">
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p> 
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
                            ))}

                            <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase Items!
                            </Button>
                        </>
                    :
                        <h1>No items in cart. 😔</h1>
                    }
                        
                </Modal.Body>
            </Modal> */}


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