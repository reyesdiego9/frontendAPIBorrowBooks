import React, { useEffect, useState } from "react";
import { Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

export const ModalEditReservation = ({
    reservationId,
    reservationDate,
    editReservation
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const updateReservation = () => {
        axios.put("http://localhost:8080/v1/reservation/extension", 
        {
            id: reservationId,
            estimatedDate: selectedDate.toISOString().substring(0, 10)
        })
            .then(() => {
                editReservation.handleClose();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(error.response.data.message)
                } else {
                    console.error(error)
                }
            });
    };

    useEffect(() => {
    }, []);

    return (
        <div>
            <Modal
                hideBackdrop
                className="modalCustomer"
                open={editReservation.open}
                onClose={editReservation.handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: "25%", minWidth: 280 }}>
                    <h2 id="child-modal-title">Add Extension</h2>
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
                            <InputLabel id="demo-simple-select-label">Current estimated return date: {reservationDate}</InputLabel>
                            <InputLabel id="demo-simple-select-label">New estimated return date:</InputLabel>
                            <FormControl fullWidth margin="normal" >
                                <Box margin="auto">
                                    <DatePicker
                                        label="Date picker"
                                        selected={selectedDate}
                                        onSelect={handleDateChange}
                                        inline
                                    />
                                </Box>
                            </FormControl>
                        </div>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={editReservation.handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={updateReservation}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};
