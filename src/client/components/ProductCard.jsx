import { CartContext } from "../CartContext";
import { useContext } from "react";

export function ProductCard(props) {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);


    return (
        <>
            <div>
                <h2>{product.productname}</h2>
                <h3>${product.price}</h3>
            </div>
        </>
    )
}