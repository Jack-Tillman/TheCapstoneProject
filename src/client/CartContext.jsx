import e from "cors";
import { createContext, useEffect, useState } from "react";
// import { getProductData } from "../server/db/cart.js";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getInitialCart: () => {},
  getProductData: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [userId, setUserId] = useState(8000);
  //grab any cart items stored in local storage
  const localCart = localStorage.getItem(`${userId} cart`);
  //convert to object so that it can be passed to setCartProducts
  const localObject = JSON.parse(localCart);
  //grab user data from session storage
  const userStorage = +sessionStorage.getItem("user");
  //useEffect fires upon page load to check if there is any data in localStorage for the cart. Without this useEffect, refreshing page clears items from cart
  useEffect(() => {
    async function getCartByUserId(userStorage, localCart) {
      //if user is signed in and has a localCart 
      if (userStorage !== null && localCart) {
        console.log(userStorage);
        setUserId(userStorage);
        setCartProducts(localObject);

      } else if (userStorage !== null && !localCart) {
        setUserId(userStorage);
        setCartProducts([]);

      } else {
        setUserId(8000);
        setCartProducts([]);

      }
    }

    // async function getUser(userStorage) {
    //   if (userStorage !== null) {
    //     const id = +userStorage.slice(6, 7);
    //     setUserId(id);
    //   } else {
    //     setUserId(0);
    //     setCartProducts([])
    //   }
    // }

    // async function getCart(localCart) {
    //   if (localCart) {
    //     console.log(localCart);
    //     console.log(localObject);
    //     //if cart data is stored in local Storage, set it as cartProducts
    //     setCartProducts(localObject);
    //     return;
    //   } else {
    //     return;
    //   }
    // }
    // getUser(userStorage);
    // getCart(localCart);
    getCartByUserId(userStorage, localCart);
  }, [userId, userStorage]);

  /*

    if (sessionStorage.getItem("user") !== null) {
      const userStorage = sessionStorage.getItem("user");
      const id = +userStorage.slice(6, 7);
      setUserId(id);
    } else {
      setUserId(0);
    }

*/

  //this function takes the data found in local storage and sets it as cartProducts
  function getInitialCart(localCart, userStorage) {
    if (localCart && userStorage) {
      setUserId(userStorage);
      setCartProducts(localObject);
      console.log(localObject);
      console.log(cartProducts);
      return;
    } else if (!localCart && userStorage) {
      setUserId(userStorage);
      setCartProducts([]);
      return;
    } else {
      setUserId(8000);
      setCartProducts([]);
    }
  }

  function getProductQuantity(stripe_id) {
    const quantity = cartProducts.find(
      (product) => product.stripe_id === stripe_id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    console.log(quantity);
    localStorage.setItem(`${userId} cart`, JSON.stringify(cartProducts));
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
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
    //LOCAL STORAGE - add the string version of the cartProduct to localStorage
    localStorage.setItem(`${userId} cart`, JSON.stringify(cartProducts));
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
    //line below will delete the cart after the final item is removed from the cart
    localStorage.removeItem(`${userId} cart`);
  }

  function getProductData(stripe_id) {
    let productData = cartProducts.find(
      (product) => product.stripe_id === stripe_id
    );

    if (productData == undefined) {
      return undefined;
    } else {
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
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getProductData,
    getTotalCost,
    getInitialCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
// Context (cart, addToCart, removeCart))
