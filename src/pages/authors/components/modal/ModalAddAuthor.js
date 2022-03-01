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
      <Modal
        hideBackdrop
        open={addAuthor.open}
        onClose={addAuthor.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
          <h2 id="child-modal-title">Add author</h2>
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
            </div>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={addAuthor.handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={saveAuthor}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
