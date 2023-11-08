import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button, Modal, Navbar } from 'react-bootstrap'
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { CartContext } from "../CartContext";
import { CartProduct } from "./CartProduct";
import { Drawer } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";



//conditional render login/register if user is logged out
//don't render login/register is user is logged out
//render dashboard/logout if user is logged in
  const data = [
    { name: "Games", link: "/games"},
    { name: "Hardware", link: "/hardware"},
    { name: "Merch", link: "/merch"},
  ];

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

  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <Link to={item.link}>
          <ListItem key={index}>
            <ListItemText primary={item.name} sx={{color: "text.primary"}}/>
          </ListItem>
        </Link>
      ))}
    </div>
  );
  return (
    <div className="navbar">
      
      <IconButton onClick={() => setOpen(true)} aria-label="Menu" color="primary">
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>


      <Link to="/">
      <IconButton aria-label="Home" color="primary">
        <HomeIcon />
      </IconButton>
      </Link>

          <FormControl sx={{ m: 1, width: "1"}}>
            <TextField
              label="Search products"
              onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
              sx={{input: { color: 'white' }}}
              size="small"
              variant="filled"
            />
          </FormControl>


          
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        
            {/* <Modal show={show} onHide={handleClose}>
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

      {/* <Link to="/games">Games</Link>
      <Link to="/hardware">Hardware</Link>
      <Link to="/merch">Merchandise</Link> */}
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
          <Link to="/dashboard">
            <IconButton aria-label="Dashboard" color="primary">
              <AccountBoxIcon />
            </IconButton>
          </Link>
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