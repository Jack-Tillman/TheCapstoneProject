import { useState, useEffect } from "react";
import { fetchAllUsers, fetchItems, fetchSingleItem } from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Dashboard = ({ token, setToken, admin, setAdmin }) => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [merches, setMerch] = useState([]);
  const [hardwares, setHardware] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getGames(admin) {
      try {
        //if user is admin, actually fire the fetch request; else, setUsers as false for conditional rendering purposes
        if (admin) {
          const response = await fetchItems("games");
          const result = await response.json();
          if (response.status === 200) {
            setGames(result);
          } else {
            setError(response.error);
            console.error(error);
          }
        } else {
          setGames(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    async function getHardware(admin) {
      try {
        //if user is admin, actually fire the fetch request; else, setUsers as false for conditional rendering purposes
        if (admin) {
          const response = await fetchItems("hardware");
          const result = await response.json();
          if (response.status === 200) {
            setHardware(result);
          } else {
            setError(response.error);
            console.error(error);
          }
        } else {
          setHardware(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    async function getMerch(admin) {
      try {
        //if user is admin, actually fire the fetch request; else, setUsers as false for conditional rendering purposes
        if (admin) {
          const response = await fetchItems("merch");
          const result = await response.json();
          if (response.status === 200) {
            setMerch(result);
          } else {
            setError(response.error);
            console.error(error);
          }
        } else {
          setMerch(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }


    async function getUsers(admin) {
      try {
        //if user is admin, actually fire the fetch request; else, setUsers as false for conditional rendering purposes
        if (admin) {
          const response = await fetchAllUsers();
          const result = await response.json();
          if (response.status === 200) {
            setUsers(result.users);
          } else {
            setError(response.error);
            console.error(error);
          }
        } else {
          setUsers(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    getUsers(admin);
    getGames(admin);
    getHardware(admin);
    getMerch(admin);
    console.log(games);
  }, []);

  return (
    <>
      {/* <h1>Welcome, {users.username}!</h1>  */}
      {/* i think we need a single user fetch */}
      <h1>This is the user dashboard.</h1>
      <h2>Congratulations on being a user</h2>
      {/* {users ? <div>{users.id}</div> : null} */}

      {users && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell align="right">userId</TableCell>
                <TableCell align="right">userName</TableCell>
                <TableCell align="right">userEmail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {games && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Games</TableCell>
                <TableCell align="right">gamesId</TableCell>
                <TableCell align="right">stripeId</TableCell>
                <TableCell align="right">productName</TableCell>
                <TableCell align="right">genre</TableCell>
                <TableCell align="right">delivery</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">stock</TableCell>
                <TableCell align="right">condition</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">publisher</TableCell>
                <TableCell align="right">productImage</TableCell>
                <TableCell align="right">playerRange</TableCell>
                <TableCell align="right">esrb</TableCell>
                <TableCell align="right">featured</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.stripe_id}</TableCell>
                  <TableCell align="right">{row.productname}</TableCell>
                  <TableCell align="right">{row.genre}</TableCell>
                  <TableCell align="right">{row.delivery}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.condition}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.publisher}</TableCell>
                  <TableCell align="right">{row.productimage}</TableCell>
                  <TableCell align="right">{row.playerrange}</TableCell>
                  <TableCell align="right">{row.esrb}</TableCell>
                  <TableCell align="right">{row.featured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {merches && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Merch</TableCell>
                <TableCell align="right">merchId</TableCell>
                <TableCell align="right">stripeId</TableCell>
                <TableCell align="right">productName</TableCell>
                <TableCell align="right">type</TableCell>
                <TableCell align="right">delivery</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">stock</TableCell>
                <TableCell align="right">condition</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">manufacturer</TableCell>
                <TableCell align="right">productImage</TableCell>
                <TableCell align="right">featured</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {merches.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.stripe_id}</TableCell>
                  <TableCell align="right">{row.productname}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.delivery}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.condition}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.manufacturer}</TableCell>
                  <TableCell align="right">{row.productimage}</TableCell>
                  <TableCell align="right">{row.featured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {hardwares && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hardware</TableCell>
                <TableCell align="right">hardwareId</TableCell>
                <TableCell align="right">stripeId</TableCell>
                <TableCell align="right">productName</TableCell>
                <TableCell align="right">type</TableCell>
                <TableCell align="right">delivery</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">stock</TableCell>
                <TableCell align="right">condition</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">manufacturer</TableCell>
                <TableCell align="right">productImage</TableCell>
                <TableCell align="right">featured</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hardwares.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.stripe_id}</TableCell>
                  <TableCell align="right">{row.productname}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.delivery}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">{row.condition}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.manufacturer}</TableCell>
                  <TableCell align="right">{row.productimage}</TableCell>
                  <TableCell align="right">{row.featured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
