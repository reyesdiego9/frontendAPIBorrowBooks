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
import { ModalAuthor } from "../modal/ModalAuthor";
import { ModalAddAuthor } from "../modal/ModalAddAuthor";
import { ModalBooksAuthor } from "../modal/ModalBookAuthor";
import { useActionModal } from "../../../../hooks/useActionModal";

export const TableAuthor = () => {
  const [Author, SetAuthor] = useState([]);
  const [value, setValue] = useState();

  const [data, setData] = useState("");
  const editAuthor = useActionModal();
  const addAuthor = useActionModal();
  const authorBook = useActionModal();

  const saveAuthor = () => {
    axios
      .put("http://localhost:8080/v1/author", data)
      .then(console.log("Data already send"))
      .catch(console.error);
    editAuthor.handleClose();
    getAuthor();
  };

  const handleAuthor = (Book) => {
    // console.log(value);
    setValue(Book);
    setData(Book);
    authorBook.handleClose();
  };

  const handleOpen = (Author) => {
    console.log(value);
    setValue(Author);
    console.log(value);
    setData(Author);
    editAuthor.handleClose();
  };

  const addAuthorModal = () => {
    addAuthor.handleClose();
  };

  const getAuthor = () => {
    axios
      .get("http://localhost:8080/v1/author")
      .then((res) => {
        SetAuthor(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAuthor();
  }, [
    editAuthor.open,
    addAuthor.open,
    editAuthor.close,
    addAuthor.close,
    authorBook.close,
    authorBook.open,
  ]);

  return (
    <>
      <Button
        color="primary"
        className="Author__button"
        variant="contained"
        onClick={addAuthorModal}
      >
        Add New Author
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Cellphone</TableCell>
              <TableCell align="center">See books</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Author.map((Author, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Author.name}
                </TableCell>
                <TableCell align="center">{Author.lastName}</TableCell>
                <TableCell align="center">{Author.direction}</TableCell>
                <TableCell align="center">{Author.cellphone}</TableCell>

                <TableCell align="center">
                  <Button
                    color="info"
                    className="Author__button"
                    variant="contained"
                    onClick={() => handleAuthor(Author)}
                  >
                    Books
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    color="secondary"
                    className="Author__button"
                    variant="contained"
                    onClick={() => handleOpen(Author)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalBooksAuthor
        val={value ?? ""}
        saveAuthor={saveAuthor}
        data={data}
        setData={setData}
        authorBook={authorBook}
        setValue={setValue}
      />

      <ModalAuthor
        val={value ?? ""}
        saveAuthor={saveAuthor}
        data={data}
        setData={setData}
        editAuthor={editAuthor}
        setValue={setValue}
      />
      <ModalAddAuthor addAuthor={addAuthor} />
    </>
  );
};
