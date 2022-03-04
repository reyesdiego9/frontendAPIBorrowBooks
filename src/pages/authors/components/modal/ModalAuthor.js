import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
} from "@mui/material";
import Slide from "@material-ui/core/Slide";
import { Box } from "@mui/system";
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

export const ModalAuthor = ({
  val,
  data,
  setData,
  editAuthor,
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

  const saveAuthor = () => {
    axios
      .put("http://localhost:8080/v1/author", data)
      .then(console.log("Data already send"))
      .catch(console.error);
    editAuthor.handleClose();
  };

  return (
    <Dialog
      open={editAuthor.open}
      onClose={editAuthor.handleClose}
      TransitionComponent={Slide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit User"}</DialogTitle>

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
          <Button variant="outlined" onClick={editAuthor.handleClose}>
            Close
          </Button>
          <Button variant="contained" color="secondary" onClick={saveAuthor}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
