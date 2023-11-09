import { fetchItems } from "../api";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";

export const StorePage = () => {
    const [games, setGames] = useState([]);
    const [merches, setMerch] = useState([]);
    const [hardwares, setHardware] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getGames() {
          const response = await fetchItems("games");
          const result = await response.json();          

          if (response.status === 200) {
            setGames(result);
          } else {
            setError(response.error);
            console.error(error);
          }
        }
        async function getHardware() {
            const response = await fetchItems("hardware");
            const result = await response.json();          
  
            if (response.status === 200) {
              setHardware(result);
            } else {
              setError(response.error);
              console.error(error);
            }
          }
          async function getMerch() {
            const response = await fetchItems("merch");
            const result = await response.json();          
  
            if (response.status === 200) {
              setMerch(result);
            } else {
              setError(response.error);
              console.error(error);
            }
          }

        getGames();
        getHardware();
        getMerch()
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
          <FormControl sx={{ m: 1, width: "1" }} variant="outlined">
            <TextField
              label="Search products"
              onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
            />
          </FormControl>
        </div>

        <a id="games"><h1 style={{color: "black"}}>Games</h1></a>
       
        
        <div className="productCard">
            {games.map((game, index) => (
              <>
                <div key={index}>
                  <ProductCard product={game} />
                </div>
              </>
          ))}
        </div>
      
      <a id="hardware"><h1 style={{color: "black"}}>Hardware</h1></a>
                
        <div className="productCard">
            {hardwares.map((hardware, index) => (
              <>
                <div key={index}>
                  <ProductCard product={hardware} />
                </div>
              </>
          ))}
        </div>

        <a id="merch"><h1 style={{color: "black"}}>Merch</h1></a>
                 
        <div className="productCard">
            {merches.map((merch, index) => (
              <>
                <div key={index}>
                  <ProductCard product={merch} />
                </div>
              </>
          ))}
        </div>
      </>
    );
}