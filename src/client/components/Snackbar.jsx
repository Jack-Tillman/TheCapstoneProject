import { useState, useEffect, forwardRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Alert was used for the styling of the success alert
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const LoginSnackbar = ({state, setState, open, handleClose, handleClick}) => {
/* 
Much of this logic was copy-pasted into MainSection in order to control whether to show or not show the Snackbar
*/
  return (
    <>
      <Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You logged in successfully!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
