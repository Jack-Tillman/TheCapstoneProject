import { createContext, useState } from "react";
// import { getProductData } from "../server/db/cart.js";

export const CartContext = createContext({
  items: [],
  details: [],
  getProductQuantity: () => {},
  addOneToDetails: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getDetailsData: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [productId, setProductId] = useState(null);

  // [ { id: 1, quantity: 2 }, { id: 2, quantity: 1} ]

  function getProductQuantity(stripe_id) {
    const quantity = cartProducts.find(
      (product) => product.stripe_id === stripe_id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(stripe_id, price, productName) {
    const quantity = getProductQuantity(stripe_id);

    if (quantity === 0) {
      //product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          stripe_id: stripe_id,
          productname: productName,
          price: price,
          quantity: 1,
        },
      ]);
    } else {
      //product is in cart
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.stripe_id === stripe_id // if condition
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                  productname: productName,
                } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function addOneToDetails(stripe_id) {
    setProductId({ stripe_id: stripe_id });
  }

  function removeOneFromCart(stripe_id) {
    const quantity = getProductQuantity(stripe_id);

    if (quantity === 1) {
      deleteFromCart(stripe_id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.stripe_id === stripe_id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function deleteFromCart(stripe_id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.stripe_id !== stripe_id;
      })
    );
  }

  function getProductData(stripe_id) {
    let productData = cartProducts.find(
      (product) => product.stripe_id === stripe_id
    );

    if (productData == undefined) {
      console.log(`Product data does not exist for ID: ${stripe_id}`);
      return undefined;
    } else {
      console.log(productData);
      return productData;
    }
  }

  function getDetailsData() {
    let detailsData = productId[0];
    if (detailsData == undefined) {
      console.log(`Details data does not exist for ID: ${stripe_id}`);
      return undefined;
    } else {
      console.log(detailsData);
      return detailsData;
    }
  }
  

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((product) => {
      const productData = getProductData(product.stripe_id);
      totalCost += productData.price * product.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    details: productId,
    getProductQuantity,
    addOneToCart,
    addOneToDetails,
    removeOneFromCart,
    deleteFromCart,
    getProductData,
    getDetailsData,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
// Context (cart, addToCart, removeCart))
// Provider => Gives React app access to all the things in context
