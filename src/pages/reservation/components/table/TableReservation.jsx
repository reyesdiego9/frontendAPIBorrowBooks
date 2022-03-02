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
import { ModalAddReservation } from "../modal/ModalAddReservation";

const useReservation = () => {
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

export const TableReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [value, setValue] = useState();
    const [data, setData] = useState("");
    const addReservation = useReservation();

    const getReservations = () => {
        axios
            .get("http://localhost:8080/v1/reservation")
            .then((res) => {
                setReservations(res.data);
            })
            .catch(console.error);
    };

    const setDayStyle = (value) => {
        return value < 10 ? "0" + value : value;
    }

    const status = ["On time", "First Extension", "Second Extension", "Delayed", "Returned"]

    const handleOpen = (reservation) => {
        setValue(reservation);
        setData(reservation);
        addReservation.handleClose();
    };

    const addReservationModal = () => {
        addReservation.handleClose();
    };

    useEffect(() => {
        getReservations();
    }, [addReservation.open, addReservation.close]);

    return (
        <>
            <Button
                color="primary"
                className="reservation__button"
                variant="contained"
                onClick={addReservationModal}
            >
                Add New Reservation
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Book</TableCell>
                            <TableCell>Reservation Date</TableCell>
                            <TableCell>Estimated Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell>Penalty</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="center">{reservation.customerName}</TableCell>
                                <TableCell align="center">{reservation.bookName}</TableCell>
                                <TableCell align="center">{reservation.reservationDate?.map(x => setDayStyle(x)).join('-')}</TableCell>
                                <TableCell align="center">{reservation.estimatedDate?.map(x => setDayStyle(x)).join('-')}</TableCell>
                                <TableCell align="center">{reservation.returnDate?.map(x => setDayStyle(x)).join('-')}</TableCell>
                                <TableCell align="center">$ {Number(reservation.penalty).toFixed(2)}</TableCell>
                                <TableCell align="center">{status[reservation.status]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalAddReservation addReservation={addReservation} />
        </>
    );
};
