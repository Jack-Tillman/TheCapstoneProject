import { fetchItems } from "../api";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";

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
      <h1>Hardware</h1>
        <div className="searchbar">
            <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
              <TextField
                label="Search products"
                onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
              />
            </FormControl>
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