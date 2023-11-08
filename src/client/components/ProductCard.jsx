import { Card, Form, Row, Col } from 'react-bootstrap';
import { Box } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import { CartContext } from "../CartContext";
import { useContext } from "react";

export function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(product);

  return (    
    <Box 
      height={200}
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
        '&:hover': {
          boxShadow: "0px 0px 10px black",
        },
      }}
    >
    <Card>
      <Card.Body>
          <Card.Title>{product.productname}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          { productQuantity > 0 ?
          <>
            <Form as={Row}>
            <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label><br />
              {/* <Col sm="6">                            
                <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)}>-</Button>
                <Button sm="6" onClick={() => cart.addOneToCart(product.id)}>+</Button>
              </Col> */}
              <ButtonGroup size="small" variant="outlined" aria-label="add/remove item from cart">
                <Button onClick={() => cart.removeOneFromCart(product.id)}>-</Button>
                <Button onClick={() => cart.addOneToCart(product.id)}>+</Button>
              </ButtonGroup>
            </Form>
            <Button sx={{marginTop: 1,}} variant="outlined" onClick={() => cart.deleteFromCart(product.id)}>Remove all from Cart</Button>
          </>    
          :
          <Button variant="contained" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
        }
      </Card.Body>
    </Card>
    </Box>
  );
};