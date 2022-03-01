import React, { useEffect, useState } from "react";
import { Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalBook = ({
  val = {
    name: "",
    category: "",
    quantity: 0,
  },
  data,
  setData,
  editBook,
  setValue = "",
}) => {

  const handleChange = (event) => {
    console.log(val);
    const { name, value } = event.target;
    setData((d) => {
      return { ...d, [name]: value };
    });
    setValue(value);
    console.log(data);
  };

  const saveBook = () => {
    axios
      .put("http://localhost:8080/v1/book", data)
      .then(console.log("Data already send"))
      .catch(console.error);
    editBook.handleClose();
  };

  return (
    <Modal
      hideBackdrop
      open={editBook.open}
      onClose={editBook.handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
        <h2 id="child-modal-title">Edit book</h2>
        <Box
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <div>


            <FormControl fullWidth>

              <TextField
                id="outlined fullWidth"
                label="name"
                fullWidth
                name="name"
                value={val.name}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>

            <TextField
              id="outlined fullWidth"
              label="Category"
              fullWidth
              value={val.category}
              onChange={handleChange}
              name="category"
              margin="normal"
            />

            <TextField
              id="outlined fullWidth"
              label="quantity"
              fullWidth
              value={val.quantity}
              onChange={handleChange}
              name="quantity"
              margin="normal"
            />





          </div>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={editBook.handleClose}>
            Close
          </Button>
          <Button variant="contained" color="secondary" onClick={saveBook}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
