import { Button } from '@mui/material';
import {IconButton} from '@mui/material';
import { CartContext } from '../CartContext'
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


export function CartProduct(props) {
    const cart = useContext(CartContext);
    const stripe_id = props.stripe_id;
    const price = props.price;
    const quantity = props.quantity;
    const productData = cart.getProductData(stripe_id);

    return (     
        <>
            {/* <img src={`${productData.productimage}`} /> */}
            {/* I would like for there to be a way to view an image of the item in the cart */}
            <h3>{productData.productname} ({quantity})</h3>
            {/* <p>{quantity} total</p> */}
            <IconButton aria-label="remove from cart" color="primary" onClick={() => cart.deleteFromCart(stripe_id)}sx={{
                float: "right",
                }}
            >
                <DeleteIcon />
            </IconButton>
            

            <p>${ quantity * price }</p>
            {/* <Button size="sm" >Remove</Button> */}

            <hr />
        </>    
    )
}