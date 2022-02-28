import React, { useEffect } from "react";
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

export const ModalCustomer = ({
  open,
  handel = "",
  change,
  val = "",
  rolid = 1,
  saveCustomer = "",
}) => {
  const [rols, setRols] = React.useState([]);

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
    change(event);
  };

  useEffect(() => {
    getRol();
  }, []);

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handel}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
        <h2 id="child-modal-title">Edit User</h2>
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
                focused
              />
              <TextField
                id="outlined fullWidth"
                label="name"
                fullWidth
                name="name"
                value={val.name}
                onChange={handleChange}
                margin="normal"
                focused
              />
            </FormControl>
            <FormControl fullWidth margin="normal" focused>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rolid}
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
              focused
            />
          </div>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handel}>
            Close
          </Button>
          <Button variant="contained" color="secondary" onClick={saveCustomer}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
