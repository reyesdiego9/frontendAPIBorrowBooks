import React from "react";
import { TableAuthor } from "./components/table/TableAuthor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./author.css";

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

export const Author = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="author">
        <TableAuthor />
      </div>
    </ThemeProvider>
  );
};
