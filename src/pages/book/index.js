import React from "react";
import { TableBook } from "./components/table/TableBook";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./book.css";

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

export const Book = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="book">
        <TableBook />
      </div>
    </ThemeProvider>
  );
};
