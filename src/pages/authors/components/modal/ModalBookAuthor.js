import { useEffect, useState } from "react";
import * as React from "react";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
} from "@mui/material";
import Slide from "@material-ui/core/Slide";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BookIcon from "@mui/icons-material/Book";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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

export const ModalBooksAuthor = ({
  val = {
    name: "",
    category: "",
    quantity: 0,
  },
  authorBook,
}) => {
  const [books, setBooks] = useState([]);

  const getAuthors = () => {
    console.log("getAuthors ");
    console.log(val);

    if (val.author_id) {
      console.log("no esta null");
      console.log(
        "http://localhost:8080/v1/authorBook/booksByAuthor/" + val.author_id
      );
      axios
        .get(
          "http://localhost:8080/v1/authorBook/booksByAuthor/" + val.author_id
        )
        .then((res) => {
          setBooks(res.data);
        })
        .catch(console.error);
    }

    console.log(books);
  };

  useEffect(() => {
    getAuthors();
  }, [authorBook.open]);

  return (
    <Dialog
      open={authorBook.open}
      onClose={authorBook.handleClose}
      TransitionComponent={Slide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Grid>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            <DialogTitle id="alert-dialog-title">
              {`Books of ${val.name} ${val.lastName}`}
            </DialogTitle>
          </Typography>
          <Demo>
            {books.length == 0 ? (
              <div>
                <p>Is empty</p>
              </div>
            ) : (
              <p></p>
            )}
            <List>
              {books.map((au, index) => (
                <ListItem
                  key={index}
                  // secondaryAction={
                  //     <IconButton edge="end" aria-label="delete">
                  //         <DeleteIcon />
                  //     </IconButton>
                  // }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <BookIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={au.name} />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={authorBook.handleClose}>
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
