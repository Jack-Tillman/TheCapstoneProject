import { createContext, useState } from "react";
// import { getProductData } from "../server/db/cart.js";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    // [ { id: 1, quantity: 2 }, { id: 2, quantity: 1} ]

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) { //product is not in cart
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { //product is in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                               // if condition
                    ? { ...product, quantity: product.quantity + 1} // if statement is true
                    : product                                       // if statement is false
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                               // if condition
                    ? { ...product, quantity: product.quantity - 1} // if statement is true
                    : product                                       // if statement is false
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        })
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

// Context (cart, addToCart, removeCart))
// Provider => Gives React app access to all the things in context