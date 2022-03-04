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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const ModalEditReservation = ({
  reservationId,
  reservationDate,
  editReservation,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const updateReservation = () => {
    axios
      .put("http://localhost:8080/v1/reservation/extension", {
        id: reservationId,
        estimatedDate: selectedDate.toISOString().substring(0, 10),
      })
      .then(() => {
        editReservation.handleClose();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Dialog
        open={editReservation.open}
        onClose={editReservation.handleClose}
        TransitionComponent={Slide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Extension"}</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">
            Current estimated return date: {reservationDate}
          </InputLabel>
          <InputLabel id="demo-simple-select-label">
            New estimated return date:
          </InputLabel>
          <FormControl fullWidth margin="normal">
            <Box margin="auto">
              <DatePicker
                label="Date picker"
                selected={selectedDate}
                onSelect={handleDateChange}
                inline
              />
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={editReservation.handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={updateReservation}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};
