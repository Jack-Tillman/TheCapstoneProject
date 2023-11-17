import { Card, Form, Row, Col, Image } from "react-bootstrap";
import { Box } from "@mui/material";
// import { Modal } from '@mui/material';
import { Button, ButtonGroup } from "@mui/material";
import { CartContext } from "../CartContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchSingleItem } from "../api";
import { SingleProduct } from "./SingleProduct";

export function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.stripe_id);
  const productStripe = props.productStripe;
  console.log('stripe at line 16 is: ');
  console.log(productStripe);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  return (
    <>
      <Box
        width={250}
        gap={0}
        sx={{
          margin: 2,
          padding: 1,
          borderColor: "primary",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 3,
          boxShadow: "0px",
          "&:hover": {
            boxShadow: "0px 0px 10px black",
          },
        }}
      >
        {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.productname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Image src={`${product.productimage}`} />
                    <p><strong>Type:</strong> {product.type}</p>
                    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                    <p><strong>Condition:</strong> {product.condition}</p>
                    <p><strong>Description:</strong> {product.description}</p>                        
                </Modal.Body>
            </Modal> */}
        <Card>
          <Card.Body>
            <Card.Img src={`${product.productimage}`} className="smallImage" />
            <Card.Title>{product.productname}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            <Button
              onClick={() => {
                // navigate("/store/productview");
                console.log(product.stripe_id);
                setProductStripe(product.stripe_id);
                console.log(productStripe);
                setTimeout(()=> {
                  navigate("/store/details");
                }, 1000)
              }}
            >
              More Info
            </Button>
            {productQuantity > 0 ? (
              <>
                <Form as={Row}>
                  <Form.Label column="true" sm="6">
                    <strong>In Cart: {productQuantity}</strong>
                  </Form.Label>
                  <br />
                  <ButtonGroup
                    size="small"
                    variant="outlined"
                    aria-label="add/remove item from cart"
                  >
                    <Button
                      onClick={() => cart.removeOneFromCart(product.stripe_id)}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => cart.addOneToCart(product.stripe_id)}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Form>
                <ButtonGroup>
                  <Button
                    sx={{ marginTop: 1 }}
                    variant="outlined"
                    onClick={() => cart.deleteFromCart(product.stripe_id)}
                  >
                    Remove all from Cart
                  </Button>
                  {/* <Button
                    variant="contained"
                    onClick={() => {
                      // navigate("/store/productview");
                      setProductStripe(product.stripe_id);
                    }}
                  >
                    More Info
                  </Button> */}
                </ButtonGroup>
              </>
            ) : (
              <ButtonGroup>
                <Button
                  variant="contained"
                  onClick={() =>
                    cart.addOneToCart(
                      product.stripe_id,
                      product.price,
                      product.productname
                    )
                  }
                >
                  Add To Cart
                </Button>
                {/* <Button
                  variant="contained"
                  onClick={() => {
                    // navigate("/store/productview");
                    setProductStripe(product.stripe_id);
                  }}
                >
                  More Info
                </Button> */}
              </ButtonGroup>
            )}
          </Card.Body>
        </Card>
      </Box>
    </>
  );
}
