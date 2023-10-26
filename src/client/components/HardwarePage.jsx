import { fetchItems } from "../api";
import { useState, useEffect } from "react";

export const HardwarePage = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [error, setError] = useState(null);

    //tinker with passing the right value into fetchItems when DB is working

    useEffect(() => {
        async function getProducts() {
          const response = await fetchItems("hardware");
          console.log(response);
          const products = response.data;

          // fix this if block since response.success doesn't come through and it throws a null error
          if (response) {
            setProducts(products);
          } else {
            setError(response.error);
            console.error(error);
          }
        }
        getProducts();
      }, []);

    // update page, filtering by search terms
    // const productsToDisplay = searchParams 
    //     ? products.filter((product) => 
    //         product.name.toLowerCase().includes(searchParams)
    //         )
    //     : products;

    return (
      <>
      <h1>Here's the Hardware Product Page</h1>
        <div className="searchbar">
          <label>
            Search Products:{" "}
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
            />
          </label>
        </div>
        
        <div className="productCard">
          <h3>Product card placeholder</h3>
          
        </div>
      </>
    );
}