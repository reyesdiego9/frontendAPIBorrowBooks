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

export const ModalAddCustomer = ({ addCustomer }) => {
  const [rols, setRols] = useState([]);
  const [val, setVal] = useState({
    id: "",
    username: "",
    name: "",
    rol: {
      id: "",
    },
    cellphone: "",
  });

  const getRol = () => {
    axios
      .get("http://localhost:8080/v1/rol")
      .then((res) => {
        console.log(res.data);
        setRols(res.data);
      })
      .catch(console.error);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "rol") {
      setVal((d) => {
        return { ...d, rol: { id: value } };
      });
    } else {
      setVal((d) => {
        return { ...d, [name]: value };
      });
    }
  };

  const saveCustomer = (data) => {
    axios
      .post("http://localhost:8080/v1/customer", val)
      .then(console.log("Customer success"))
      .catch(console.error);
    addCustomer.handleClose();
  };

  useEffect(() => {
    getRol();
  }, []);

  return (
    <div>
      <Dialog
        open={addCustomer.open}
        onClose={addCustomer.handleClose}
        TransitionComponent={Slide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add User"}</DialogTitle>
        <DialogContent>
          <div>
            <FormControl fullWidth>
              <TextField
                id="outlined fullWidth"
                label="username"
                fullWidth
                value={val.username}
                onChange={handleChange}
                name="username"
                margin="normal"
              />
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={val.rol.id}
                label="Age"
                onChange={handleChange}
                name="rol"
              >
                {rols.map((rol, index) => (
                  <MenuItem key={index} value={rol.id}>
                    {rol.rol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined fullWidth"
              label="cellphone"
              fullWidth
              name="cellphone"
              onChange={handleChange}
              value={val.cellphone}
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={addCustomer.handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={saveCustomer}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};
