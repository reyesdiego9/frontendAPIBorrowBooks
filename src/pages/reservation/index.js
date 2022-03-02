import React from "react";
import { TableReservation } from './components/table/TableReservation'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./reservation.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4B286D",
    },
    secondary: {
      main: "#2B8000",
    },
    edit: {
      main: "#FACA69",
    },
  },
});

export const Reservation = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="reservation">
        <TableReservation />
      </div>
    </ThemeProvider>
  );
};
