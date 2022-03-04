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
import { ModalEditReservation } from "../modal/ModalEditReservation";
import { useActionModal } from "../../../../hooks/useActionModal";


export const TableReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [reservationId, setReservationId] = useState(0);
    const [reservationDate, setReservationDate] = useState(new Date().toISOString().substring(0, 10));
    const addReservation = useActionModal();
    const editReservation = useActionModal();

    const getReservations = () => {
        axios.get("http://localhost:8080/v1/reservation")
            .then((res) => {
                setReservations(res.data);
            })
            .catch(console.error);
    };

    const deleteReservation = (event) => {
        axios.delete("http://localhost:8080/v1/reservation",
            { data: { "id": event.target.value } })
            .then(() => {
                getReservations();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            });
    }

    const addReturnToReservation = (event) => {
        axios.put("http://localhost:8080/v1/reservation/return",
            { "id": event.target.value })
            .then(() => {
                getReservations();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            });
    }

    const setDayStyle = (value) => {
        return value < 10 ? "0" + value : value;
    }

    const status = ["On time", "First Extension", "Second Extension", "Delayed", "Returned"]

    const handleOpen = (reservation) => {
        let resDate = reservation.estimatedDate?.map(x => setDayStyle(x)).join('-')
        setReservationId(reservation.id);
        setReservationDate(resDate);
        editReservation.handleClose();
    };

    const addReservationModal = () => {
        addReservation.handleClose();
    };

    useEffect(() => {
        getReservations();
    }, [addReservation.open, addReservation.close, editReservation.open, editReservation.close]);

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
                            <TableCell>Actions</TableCell>
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
                                <TableCell>
                                    <Button
                                        color="success"
                                        onClick={() => handleOpen(reservation)}
                                        disabled={reservation.status > 1}
                                    >
                                        Extension
                                    </Button>
                                    <Button
                                        color="primary"
                                        value={reservation.id}
                                        onClick={addReturnToReservation}
                                        disabled={reservation.status === 4}
                                    >
                                        Return
                                    </Button>
                                    <Button
                                        color="error"
                                        value={reservation.id}
                                        onClick={deleteReservation}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalAddReservation addReservation={addReservation} />
            <ModalEditReservation
                reservationId={reservationId}
                reservationDate={reservationDate}
                editReservation={editReservation}
            />
        </>
    );
};
