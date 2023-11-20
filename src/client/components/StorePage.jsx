import { fetchItems, fetchSingleItem } from "../api";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap"
import { Fab } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
    getMerch();
  }, []);

  // update page, filtering by search terms
  // const productsToDisplay = searchParams
  //     ? products.filter((product) =>
  //         product.name.toLowerCase().includes(searchParams)
  //         )
  //     : products;

    //working on fetchSingleItem for single item view
    return (
      <>
        {/* <a href="">
        <Fab color="primary" aria-label="back to top"
          sx={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
          }}>
          <ArrowUpwardIcon />
        </Fab>
        </a> */}
        <h1 className={"links"}><a href="#games">Games</a> | <a href="#hardware">Hardware</a> | <a href="#merch">Merch</a></h1>
        <a id="games"><hr className={"hr-text gradient"} data-content={"Games"} /></a>

        <div className="productCard">
            {games.map((game, index) => (
              <>
                <div key={index}>
                  <ProductCard product={game} />
                  {/* <Button onClick={() => fetchSingleItem(game.stripe_id, "games")}>More Info</Button> */}
                </div>
              </>
          ))}
        </div>
      
      <a id="hardware"><hr className={"hr-text gradient"} data-content={"Hardware"} /></a>
                
        <div className="productCard">
            {hardwares.map((hardware, index) => (
              <>
                <div key={index}>
                  <ProductCard product={hardware} />
                  {/* <Button onClick={() => fetchSingleItem(hardware.stripe_id, "hardware")}>More Info</Button> */}
                </div>
              </>
          ))}
        </div>

        <a id="merch"><hr className={"hr-text gradient"} data-content={"Merch"} /></a>
                 
        <div className="productCard">
            {merches.map((merch, index) => (
              <>
                <div key={index}>
                  <ProductCard product={merch} />
                  {/* <Button onClick={() => fetchSingleItem(merch.stripe_id, "merch")}>More Info</Button> */}
                </div>
              </>
          ))}
        </div>
      </>
    );
}