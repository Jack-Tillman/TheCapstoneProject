import { fetchItems } from "../api";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

export const HardwarePage = () => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getProducts() {
          const response = await fetchItems("hardware");
          const result = await response.json();          

          if (response.status === 200) {
            setProducts(result);
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
            {products.map((product, index) => (
              <>
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              </>
          ))}
        </div>
      </>
    );
}