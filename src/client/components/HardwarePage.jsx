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
          const products = response.data.products;
          if (response.success) {
            setPosts(products);
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
          <h1>Here's the Hardware Product Page</h1>
          <h2>There will be hareware here!</h2>
        </div>
      </>
    );
}