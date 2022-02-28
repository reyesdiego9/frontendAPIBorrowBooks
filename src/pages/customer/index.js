import React from "react";
import { TableCustomer } from "./components/table/TableCustomer";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./customer.css";

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

export const Customer = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="customer">
        <Button
          color="primary"
          className="customer__button"
          variant="contained"
        >
          Add New Customer
        </Button>
        <TableCustomer />
      </div>
    </ThemeProvider>
  );
};
