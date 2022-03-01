import React, { useEffect, useState } from "react";


import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import { Button } from "@mui/material";
import { ModalBook } from "../modal/ModalBook";
import { ModalAddBook } from "../modal/ModalAddBook";

import {ModalAuthorsBook} from "../modal/ModalAuthorsBook";

const useBook = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return {
    open,
    handleClose,
  };
};

export const TableBook = () => {
  const [Book, SetBook] = useState([]);
  const [value, setValue] = useState();

  const [data, setData] = useState("");
  const editBook = useBook();
  const addBook = useBook();
  const authorBook = useBook();

  const saveBook = () => {
    axios
      .put("http://localhost:8080/v1/book", data)
      .then(console.log("Data already send"))
      .catch(console.error);
    editBook.handleClose();
    getBook();
  };

  const handleAuthor = (Book) => {
    // console.log(value); 
    setValue(Book); 
    setData(Book); 
    authorBook.handleClose(); 
  }; 


  const handleOpen = (Book) => {
    // console.log(value);
    setValue(Book);
    // console.log(value);
    setData(Book);
    editBook.handleClose();
  };

  const addBookModal = () => {
    addBook.handleClose();
  };

  const getBook = () => {
    axios
      .get("http://localhost:8080/v1/book")
      .then((res) => {
        SetBook(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getBook();
  }, [editBook.open, addBook.open, authorBook.open, editBook.close, addBook.close]);

  return (
    <>
      <Button
        color="primary"
        className="Book__button"
        variant="contained"
        onClick={addBookModal}
      >
        Add New Book
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="center">See authors</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Book.map((Book, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Book.name}
                </TableCell>
                <TableCell align="center">{Book.category}</TableCell>
                <TableCell align="center">{Book.quantity}</TableCell>

                <TableCell align="center">
                  <Button
                    color="info"
                    className="book__button"
                    variant="contained"
                    onClick={() => handleAuthor(Book)}
                  >
                    Authors
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    color="secondary"
                    className="book__button"
                    variant="contained"
                    onClick={() => handleOpen(Book)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalAuthorsBook
        val={value ?? ""}
        saveBook={saveBook}
        data={data}
        setData={setData}
        authorBook={authorBook}
        setValue={setValue}
      />

      <ModalBook
        val={value ?? ""}
        saveBook={saveBook}
        data={data}
        setData={setData}
        editBook={editBook}
        setValue={setValue}
      />
      <ModalAddBook addBook={addBook} />
    </>
  );
};
