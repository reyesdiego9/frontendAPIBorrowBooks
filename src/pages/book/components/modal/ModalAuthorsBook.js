import { useEffect, useState } from "react";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
} from "@mui/material";
import Slide from "@material-ui/core/Slide";

import { Button } from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const ModalAuthorsBook = ({
  val = {
    name: "",
    category: "",
    quantity: 0,
  },
  authorBook,
}) => {
  const navigate = useNavigate();

  const changeAuthors = () => {
    navigate("/authorsByBook/" + val.book_id);
  };

  const [authors, setAuthors] = useState([]);

  const getAuthors = () => {
    console.log("getAuthors ");
    console.log(val);

    if (val.book_id) {
      axios
        .get("http://localhost:8080/v1/authorBook/AuthorsByBook/" + val.book_id)
        .then((res) => {
          setAuthors(res.data);
        })
        .catch(console.error);
    }

    console.log(authors);
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
      <div>
        <Grid>
          <DialogTitle id="alert-dialog-title">{`Authors of ${val.name}`}</DialogTitle>
          <DialogContent>
            <Demo>
              {authors.length === 0 ? (
                <div>
                  <p>Is empty</p>
                </div>
              ) : (
                <p></p>
              )}
              <List>
                {authors.map((au, index) => (
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
                        <PersonOutlineTwoToneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={au.name + " " + au.lastName} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </DialogContent>
        </Grid>
      </div>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={authorBook.handleClose}>
            Close
          </Button>
          <Button variant="contained" color="info" onClick={changeAuthors}>
            Edit
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
