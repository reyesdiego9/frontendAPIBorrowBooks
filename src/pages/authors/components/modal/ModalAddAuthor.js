import React, { useState } from "react";
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

export const ModalAddAuthor = ({ addAuthor }) => {
  const [val, setVal] = useState({
    name: "",
    lastName: "",
    direction: "",
    cellphone: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVal((d) => {
      return { ...d, [name]: value };
    });
  };

  const saveAuthor = (data) => {
    console.log(data);
    console.log(val);
    axios
      .post("http://localhost:8080/v1/author", val)
      .then(console.log("Author success"))
      .catch(console.error);
    addAuthor.handleClose();
  };

  return (
    <div>
      <Dialog
        open={addAuthor.open}
        onClose={addAuthor.handleClose}
        TransitionComponent={Slide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add author"}</DialogTitle>

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
            label="last name"
            fullWidth
            value={val.lastName}
            onChange={handleChange}
            name="lastName"
            margin="normal"
          />

          <TextField
            id="outlined fullWidth"
            label="direction"
            fullWidth
            value={val.direction}
            onChange={handleChange}
            name="direction"
            margin="normal"
          />

          <TextField
            id="outlined fullWidth"
            label="cellphone"
            fullWidth
            name="cellphone"
            onChange={handleChange}
            value={val.cellphone}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={addAuthor.handleClose}>
              Close
            </Button>
            <Button variant="contained" color="secondary" onClick={saveAuthor}>
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};
