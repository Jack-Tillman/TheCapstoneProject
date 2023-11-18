import { useState, useEffect } from "react";
import { fetchItems } from "../api";
import { LoginSnackbar } from "./Snackbar";
//featured items, 1-2 items per category
//category selection

export const HomePage = ({
  state,
  setState,
  open,
  handleClose,
  handleClick,
}) => {
//render snackbar only when state is open 
  return (
    <>
      {open ? (
        <LoginSnackbar
          state={state}
          setState={setState}
          open={open}
          handleClose={handleClose}
          handleClick={handleClick}
        />
      ) : null}
      <div className="card">
        <h1>This is such a neat Homepage</h1>
        <h2>There will be more stuff here later</h2>
      </div>
    </>
  );
};
