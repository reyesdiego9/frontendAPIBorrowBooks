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
import { ModalAddCustomer } from "../modal/ModalAddCustomer";

const useCustomer = () => {
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

export const TableCustomer = () => {
  const [customer, SetCustomer] = useState([]);
  const [value, setValue] = useState();
  const [rol, setRol] = useState("");
  const [data, setData] = useState("");
  const [animation, setAnimation] = useState("");
  const editCustomer = useCustomer();
  const addCustomer = useCustomer();

  const saveCustomer = () => {
    axios
      .put("http://localhost:8080/v1/customer", data)
      .then(console.log("Data already send"))
      .catch(console.error);
    editCustomer.handleClose();
    getCustomer();
  };

  const handleOpen = (customer) => {
    console.log(value);
    setValue(customer);
    console.log(value);
    setData(customer);
    setRol(customer.rol.id);
    editCustomer.handleClose();
    setAnimation("animate__animated animate__bounce");
  };

  const addCustomerModal = () => {
    addCustomer.handleClose();
  };

  const getCustomer = () => {
    axios
      .get("http://localhost:8080/v1/customer")
      .then((res) => {
        SetCustomer(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getCustomer();
  }, [editCustomer.open, addCustomer.open]);

  return (
    <>
      <Button
        color="primary"
        className="customer__button"
        variant="contained"
        onClick={addCustomerModal}
      >
        Add New Customer
      </Button>
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

      {editCustomer.open && (
        <ModalCustomer
          val={value ?? ""}
          rolid={parseInt(rol)}
          saveCustomer={saveCustomer}
          data={data}
          setData={setData}
          editCustomer={editCustomer}
          setRol={setRol}
          setValue={setValue}
        />
      )}

      {addCustomer.open && <ModalAddCustomer addCustomer={addCustomer} />}
    </>
  );
};
