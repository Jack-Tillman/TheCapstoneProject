import { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Tooltip title="More info" placement="right">
          <IconButton
            onClick={() => {
              handleOpen();
            }}
            color="info"
            aria-label="more info"
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <IconButton onClick={handleClose} color="primary" sx={{float: "right"}}><CloseIcon /></IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <p>{product.productname}</p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>
                Product Description: <br /> {product.description}
              </p>
              {product.esrb ? <p>ESRB Rating: {product.esrb}</p> : null}
              {product.manufacturer ? (
                <p>Manufacturer: {product.manufacturer}</p>
              ) : (
                <p>Publisher: {product.publisher}</p>
              )}
              {product.type ? (
                <p>Type: {product.type} </p>
              ) : (
                <p>Genre: {product.genre}</p>
              )}
              <p>Condition: {product.condition}</p>
              <p>Price: ${product.price}</p>
              <p>Delivery option: {product.delivery}</p>
            </Typography>
            {/* <button onClick={handleClose}>Close</button> */}
          </Box>
        </Modal>
      </div>
    </>
  );
};
