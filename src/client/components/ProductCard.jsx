import { Card, Form, Row, Col, Image } from "react-bootstrap";
import { Box, Tooltip } from "@mui/material";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { CartContext } from "../CartContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchSingleItem } from "../api";
import { SingleProduct } from "./SingleProduct";
import InfoIcon from "@mui/icons-material/Info";
import { BasicModal } from "./Modal.jsx";


export function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.stripe_id);
  const productData = cart.getProductData(product.stripe_id);

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
            boxShadow: "0px 0px 50px black",
            transition: "0.2s",
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
              </ButtonGroup>
            )}
            <BasicModal product={product} />
            {/* <Tooltip title="More info" placement="right">
              <IconButton
                onClick={() => {
                  console.log(product);
                  setShow(true);
                  // cart.addOneToDetails(product.stripe_id);
                  // navigate("/store/details");
                }}
                color="info"
                aria-label="more info"
              >
                <BasicModal product={product} />
                <InfoIcon />
              </IconButton>
            </Tooltip> */}
          </Card.Body>
        </Card>
      </Box>
    </>
  );
}
