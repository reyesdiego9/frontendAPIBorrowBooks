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
      <Modal
        hideBackdrop
        open={addCustomer.open}
        onClose={addCustomer.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
          <h2 id="child-modal-title">Add User</h2>
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
          </Box>
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
        </Box>
      </Modal>
    </div>
  );
};
