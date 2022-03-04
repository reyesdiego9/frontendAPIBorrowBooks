import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
} from "@mui/material";
import Slide from "@material-ui/core/Slide";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
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

export const ModalAddBook = ({ addBook }) => {
  const [val, setVal] = useState({
    name: "",
    category: "",
    quantity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVal((d) => {
      return { ...d, [name]: value };
    });
  };

  const saveBook = (data) => {
    console.log(data);
    console.log(val);
    axios
      .post("http://localhost:8080/v1/book", val)
      .then(setVal({
        name: "",
        category: "",
        quantity: 0,
      }))
      .catch(console.error);
    addBook.handleClose();
  };

  return (
    <div>
      <Dialog
        open={addBook.open}
        onClose={addBook.handleClose}
        TransitionComponent={Slide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Book"}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={addBook.handleClose}>
              Close
            </Button>
            <Button variant="contained" color="secondary" onClick={saveBook}>
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};
