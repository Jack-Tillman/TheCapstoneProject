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
        className="productCardBox"
      >
        <table className="productCardTable">
        <thead>
          <tr>
            <td rowspan="3" width={"50%"}><img src={`${product.productimage}`} className="smallImage" /></td>
            <td><b>{product.productname}</b></td>
          </tr>
          <tr>
            <td>${product.price} <BasicModal product={product}/></td>
          </tr>
          <tr>
            <td>
            {productQuantity > 0 ? (
              <>
                  <p className="noMargin">In Cart: {productQuantity}</p>
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
                <ButtonGroup>
                  <Button
                    sx={{ marginTop: 1 }}
                    variant="outlined"
                    size="small"
                    onClick={() => cart.deleteFromCart(product.stripe_id)}
                  >
                    Remove all
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
            </td>
          </tr>
        </thead>
        </table>
      </Box>
    </>
  );
}
