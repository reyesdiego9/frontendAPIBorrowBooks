import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";

import axios from "axios";

import { DialogTitle } from "@mui/material";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";

import "./file.css";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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

export function AuthorsByBook() {
  const [dense, setDense] = React.useState(false);

  const { id } = useParams();

  const [book, setBook] = React.useState({
    book_id: null,
    name: null,
    category: null,
    quantity: null,
  });

  const [authorsIn, setAuthorsIn] = useState([]);
  const [authorsOut, setAuthorsOut] = useState([]);

  const getBook = () => {
    console.log(id);
    axios
      .get("http://localhost:8080/v1/book/" + id)
      .then((res) => {
        getBook();
        getAuthorsIn_out();
        setBook(res.data);
        console.log(res.data);
      })
      .catch(console.error);
  };

  const addAuthor = (au) => {
    const send = {
      book: {
        book_id: id,
      },
      author: {
        author_id: au.author_id,
      },
    };

    axios
      .post("http://localhost:8080/v1/authorBook", send)
      .then( (res) => {
        getBook();
        getAuthorsIn_out();
      })
      .catch(console.error);

    getAuthorsIn_out();
  };

  const deleteAuthor = (au) => {
    const send = {
      book: id,
      author: au.author_id,
    };
    axios
      .post("http://localhost:8080/v1/authorBook/delete", send)
      .then(console.log("Data already send"))
      .catch(console.error);

    getAuthorsIn_out();
  };

  const getAuthorsIn_out = () => {
    axios
      .get("http://localhost:8080/v1/authorBook/AuthorsByBookWithID/" + id)
      .then((res) => {
        setAuthorsIn(res.data);
        console.log("In");
        console.log(res.data);

      })
      .catch(console.error);

    axios
      .get("http://localhost:8080/v1/authorBook/AuthorsWhoAreNotIn/" + id)
      .then((res) => {
        console.log("Out");
        console.log(res.data);
        setAuthorsOut(res.data);

      })
      .catch(console.error);
  };

  useEffect(() => {
    getBook();
    getAuthorsIn_out();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="body">
        {book ? (
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              Authors of book {book.name}
            </DialogTitle>

            <Grid container spacing={1}>
              <Grid item xs={12} md={5}>
                <Typography
                  sx={{ mt: 4, mb: 2, textAlign: "center" }}
                  variant="h6"
                  component="div"
                >
                  Authors who worked on the book.
                </Typography>
                <Demo>
                  {authorsIn.length === 0 ? (
                    <div>
                      <p>Is empty</p>
                    </div>
                  ) : (
                    <List dense={dense}>
                      {authorsIn.map((au, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteAuthor(au)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <PersonOutlineTwoToneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={au.name + " " + au.lastName} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Demo>
              </Grid>

              <Grid item md={2}></Grid>
              <Grid item xs={12} md={5}>
                <Typography
                  sx={{ mt: 4, mb: 2, textAlign: "center" }}
                  variant="h6"
                  component="div"
                >
                  Authors who don't worked on the book.
                </Typography>
                <Demo>
                  {authorsOut.length === 0 ? (
                    <div>
                      <p>Is empty</p>
                    </div>
                  ) : (
                    <List>
                      {authorsOut.map((au, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => addAuthor(au)}
                            >
                              <AddCircleOutlineTwoToneIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <PersonOutlineTwoToneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={au.name + " " + au.lastName} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Demo>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <p></p>
        )}
      </div>
    </ThemeProvider>
  );
}
