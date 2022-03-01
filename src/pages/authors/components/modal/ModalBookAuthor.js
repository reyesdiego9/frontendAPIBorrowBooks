import { useEffect, useState } from "react";
import * as React from 'react';
import { Modal, Stack } from "@mui/material";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import BookIcon from '@mui/icons-material/Book';




const Demo = styled('div')(({ theme }) => ({
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
    data,
    setData,
    authorBook,
    setValue = "",
}) => {

    const navigate = useNavigate();




    const [books, setBooks] = useState([]);


    const getAuthors = () => {

        console.log("getAuthors ");
        console.log(val);


        if (val.author_id) {

            console.log("no esta null"); 
            console.log("http://localhost:8080/v1/authorBook/booksByAuthor/" + val.author_id)
            axios
                .get("http://localhost:8080/v1/authorBook/booksByAuthor/" + val.author_id)
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
        <Modal
            hideBackdrop
            open={authorBook.open}
            onClose={authorBook.handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Grid  >
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                <h2 id="child-modal-title">Books of {val.name}  {val.lastName}</h2>
                            </Typography>
                            <Demo>
                                {books.length == 0 ? (
                                    <div><p>Is empty</p></div>
                                ) : (<p></p>)}
                                <List >
                                    {books.map((au, index) => (





                                        <ListItem key={index}
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
                                            <ListItemText
                                                primary={au.name}
                                            />
                                        </ListItem>



                                    ))}
                                </List>
                            </Demo>
                        </Grid>




                    </div>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={authorBook.handleClose}>
                        Close
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};
