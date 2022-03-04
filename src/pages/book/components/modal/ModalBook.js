import React from "react";
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
    <Dialog
      open={editBook.open}
      onClose={editBook.handleClose}
      TransitionComponent={Slide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit book"}</DialogTitle>

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
            active
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
          active
        />

        <TextField
          id="outlined fullWidth"
          label="quantity"
          fullWidth
          value={val.quantity}
          onChange={handleChange}
          name="quantity"
          margin="normal"
          active
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={editBook.handleClose}>
            Close
          </Button>
          <Button variant="contained" color="secondary" onClick={saveBook}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
