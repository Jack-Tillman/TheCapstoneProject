import { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import { fetchSingleItem } from "../api";
import { useParams } from "react-router";

export const SingleProduct = () => {
  const cart = useContext(CartContext);
  const productStripe = cart.getDetailsData(stripe_id)
  console.log("ps is:");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const category = "games";

  useEffect(() => {
    async function getSingleItem(productStripe, category) {
      const response = await fetchSingleItem(productStripe, category);
      console.log(`Response: ${response}`);
      console.log(response);
      const result = response.json();
      console.log(result);
      console.log(response.status);
      if (response.status === 200) {
        setProduct(response);
      } else {
        setError("Error found fetching single item");
      }
    }
    getSingleItem(productStripe, category);
  }, [product]);
  console.log(productStripe);
  console.log("product is: ");
  console.log(product);
  return (
    <>
      {product &&
        product.map((product, index) => {
          <div className="product-container" key={index}>
            <h2>{product.productname}</h2>
          </div>;
        })}
    </>
  );
};
