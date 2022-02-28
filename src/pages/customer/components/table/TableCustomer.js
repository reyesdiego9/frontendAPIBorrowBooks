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
import { ModalCustomer } from "../modal/ModalCustomer";

export const TableCustomer = () => {
  const [customer, SetCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [rol, setRol] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    getCustomer();
  }, [customer]);

  const saveCustomer = () => {
    axios
      .put("http://localhost:8080/v1/customer", data)
      .then((res) => console.log("Data already send"))
      .catch(console.error);
    setOpen(false);
  };

  const handleOpen = (customer) => {
    setValue(customer);
    console.log(customer);
    setData(customer);
    setRol(customer.rol.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "rol") {
      setData({ ...data, rol: { id: value } });
      setRol(value);
    } else {
      setData((data) => {
        return { ...data, [name]: value };
      });
    }
    setValue(value);
  };

  const getCustomer = () => {
    axios
      .get("http://localhost:8080/v1/customer")
      .then((res) => {
        SetCustomer(res.data);
      })
      .catch(console.error);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Rol</TableCell>
              <TableCell align="center">Cellphone</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell align="center">{customer.username}</TableCell>
                <TableCell align="center">{customer.rol.rol}</TableCell>
                <TableCell align="center">{customer.cellphone}</TableCell>
                <TableCell align="center">
                  <Button
                    color="secondary"
                    className="customer__button"
                    variant="contained"
                    onClick={() => handleOpen(customer)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalCustomer
        open={open}
        set={setOpen}
        handel={handleClose}
        change={handleChange}
        val={value}
        rolid={rol}
        saveCustomer={saveCustomer}
      />
    </>
  );
};
