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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@material-ui/core";

export const ModalAddReservation = ({ addReservation }) => {
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [val, setVal] = useState({
    book: {
      book_id: 1,
    },
    customer: {
      id: 1,
    },
    estimatedDate: selectedDate.toISOString().substring(0, 10),
  });

  const getCustomers = () => {
    axios
      .get("http://localhost:8080/v1/customer")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch(console.error);
  };

  const getBooks = () => {
    axios
      .get("http://localhost:8080/v1/book")
      .then((res) => {
        setBooks(res.data);
      })
      .catch(console.error);
  };

  const handleBookChange = (event) => {
    const { value } = event.target;
    setVal((reservationObject) => {
      return { ...reservationObject, book: { book_id: value } };
    });
  };

  const handleCustomerChange = (event) => {
    const { value } = event.target;
    setVal((reservationObject) => {
      return { ...reservationObject, customer: { id: value } };
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setVal((reservationObject) => {
      return {
        ...reservationObject,
        estimatedDate: date.toISOString().substring(0, 10),
      };
    });
  };

  const saveReservation = () => {
    axios
      .post("http://localhost:8080/v1/reservation", val)
      .then(() => {
        addReservation.handleClose();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    getCustomers();
    getBooks();
  }, [addReservation.open, addReservation.close]);

  return (
    <div>
      <Dialog
        open={addReservation.open}
        onClose={addReservation.handleClose}
        TransitionComponent={Slide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Reservation"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Book</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={val.book.book_id}
              label="Book"
              onChange={handleBookChange}
              name="book"
            >
              {books.map((book, index) => (
                <MenuItem key={index} value={book.book_id}>
                  {book.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Customer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={val.customer.id}
              label="Customer"
              onChange={handleCustomerChange}
              name="customer"
            >
              {customers.map((customer, index) => (
                <MenuItem key={index} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel id="demo-simple-select-label">
            Estimated return date:
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
            <Button variant="outlined" onClick={addReservation.handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={saveReservation}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};
