import { useState, useEffect } from "react";
import { fetchAllUsers, fetchItems, fetchSingleItem } from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { FullFeaturedCrudGrid } from "./FullCrudDataGrid";

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

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "email", headerName: "email", width: 130 },
  ];
  const userRows = users;

  const gamesColumns = [
    { field: "id", headerName: "ID", width: 70, editable: true, },
    { field: "stripe_id", headerName: "stripeId", width: 130, editable: true, },
    { field: "productname", headerName: "Product Name", width: 130, editable: true, },
    { field: "genre", headerName: "Genre", width: 130, editable: true, },
    { field: "delivery", headerName: "Delivery Name", width: 130, editable: true, },
    { field: "price", headerName: "price ($)", width: 130, editable: true, },
    { field: "stock", headerName: "stock", width: 130, editable: true, },
    { field: "condition", headerName: "Condition", width: 130, editable: true, },
    { field: "description", headerName: "Description", width: 130, editable: true, },
    { field: "publisher", headerName: "Publisher", width: 130, editable: true, },
    { field: "productimage", headerName: "Product Image", width: 130, editable: true, },
    { field: "playerrange", headerName: "Player Range", width: 130, editable: true, },
    { field: "esrb", headerName: "ESRB Rating", width: 130, editable: true, },
    { field: "featured", headerName: "Featured", width: 130, editable: true, },
  ];

  const gamesRows = games;

  const merchColumns = [
    { field: "id", headerName: "ID", width: 70, editable: true, },
    { field: "stripe_id", headerName: "stripeId", width: 130, editable: true, },
    { field: "productname", headerName: "Product Name", width: 130, editable: true, },
    { field: "type", headerName: "Type", width: 130, editable: true, },
    { field: "delivery", headerName: "Delivery Name", width: 130, editable: true, },
    { field: "price", headerName: "price ($)", width: 130, editable: true, },
    { field: "stock", headerName: "stock", width: 130, editable: true, },
    { field: "condition", headerName: "Condition", width: 130, editable: true, },
    { field: "description", headerName: "Description", width: 130, editable: true, },
    { field: "manufacturer", headerName: "Manufacturer", width: 130, editable: true, },
    { field: "productimage", headerName: "Product Image", width: 130, editable: true, },
    { field: "featured", headerName: "Featured", width: 130, editable: true, },
  ];

  const merchRows = merches;

  const hardwareColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "stripe_id", headerName: "stripeId", width: 130  },
    { field: "productname", headerName: "Product Name", width: 130, editable: true, },
    { field: "type", headerName: "Type", width: 130, editable: true, },
    { field: "delivery", headerName: "Delivery Name", width: 130, editable: true, },
    { field: "price", headerName: "price ($)", width: 130, editable: true, },
    { field: "stock", headerName: "stock", width: 130, editable: true, },
    { field: "condition", headerName: "Condition", width: 130, editable: true, },
    { field: "description", headerName: "Description", width: 130, editable: true, },
    { field: "manufacturer", headerName: "Manufacturer", width: 130, editable: true, },
    { field: "productimage", headerName: "Product Image", width: 130, editable: true, },
    { field: "featured", headerName: "Featured", width: 130, editable: true, },
  ];

  const hardwareRows = hardwares;

  console.log(users);
  return (
    <>
      {/* <h1>Welcome, {users.username}!</h1>  */}
      {/* i think we need a single user fetch */}
      <h1>This is the user dashboard.</h1>
      <h2>Congratulations on being a user</h2>


      {users && <FullFeaturedCrudGrid userRows={userRows} admin={admin}/>} 

 
      {/* {users && (
        <div className="users-container" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={userRows}
            columns={userColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
      {games && (
        <div className="games-container" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={gamesRows}
            columns={gamesColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
      {merches && (
        <div
          className="merches-container"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid
            rows={merchRows}
            columns={merchColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
      {hardwares && (
        <div
          className="hardwares-container"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid
            rows={hardwareRows}
            columns={hardwareColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}  */}
    </>
  );
};
