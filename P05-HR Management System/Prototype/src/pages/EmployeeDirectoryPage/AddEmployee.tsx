import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Button, Modal, TextField } from "@mui/material";

import axios from "axios";
const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export interface IAddEmployeeProps {
  setOpen: (arg0: boolean) => any;
  open: boolean;
}
export default function AddEmployee(props: IAddEmployeeProps) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [leaves, setLeaves] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const classes = useStyles();

  const handleAddEmployee = async () => {
    // setAnchorEl(event.currentTarget);
    // const check = is_empty(title, aData, id);
    // if (check == 0) {
    await axios({
      method: "post",
      url: "http://localhost:5001/addnewemployee",
      data: {
        id: employeeID,
        name: name,
        department: department,
        designation: designation,
        level: level,
        dateJoined: dateJoined,
        email: email,
        contact: contact,
        address: address,
        remainingLeaves: leaves,
        twRating: rating,
      },
    });
    props.setOpen(false);
    // }
  };

  return (
    <div>
      <Button onClick={handleOpen}>ADD EMPLOYEE</Button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes.root}>
            <TextField
              id="employeeID"
              label="Employee ID"
              variant="standard"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
            <TextField
              id="name"
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="department"
              label="Department"
              variant="standard"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <TextField
              id="level"
              label="Level"
              variant="standard"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <TextField
              id="contact"
              label="Contact"
              variant="standard"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              id="designation"
              label="Designation"
              variant="standard"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              id="address"
              label="Address"
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="dateJoined"
              label="Date Joined"
              variant="standard"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="twRating"
              label="TW Rating"
              variant="standard"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <TextField
              id="remainingLeaves"
              label="Remaining Leaves"
              variant="standard"
              value={leaves}
              onChange={(e) => setLeaves(e.target.value)}
            />
            <Button onClick={handleAddEmployee}>ADD</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
