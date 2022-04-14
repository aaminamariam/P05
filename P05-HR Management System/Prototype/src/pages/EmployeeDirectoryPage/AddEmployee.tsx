import axios from "axios";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PersonAdd } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

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
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [value, setValue] = useState<Date | null>(new Date());
  const classes = useStyles();

  const handleAddEmployee = async () => {
    // setAnchorEl(event.currentTarget);
    // const check = is_empty(title, aData, id);
    // if (check == 0) {
    await axios({
      method: "post",
      url: "http://localhost:5001/addnewemployee",
      data: {
        employeeID: employeeID,
        name: name,
        department: department,
        designation: designation,
        level: level,
        role: role,
        password: password,
        dateJoined: dateJoined,
        email: email,
        contact: contact,
        address: address,
        gender: gender,
      },
    });
    props.setOpen(false);
    // }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<PersonAdd />}>
        ADD EMPLOYEE
      </Button>
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
              required
              variant="standard"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
            <TextField
              id="name"
              label="Name"
              required
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="department"
              label="Department"
              required
              variant="standard"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <TextField
              id="level"
              label="Level"
              required
              variant="standard"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                sx={{ minWidth: 200 }}
                variant="standard"
                onChange={handleChange}
              >
                <MenuItem value={"Employee"}>Employee</MenuItem>
                <MenuItem value={"HR"}>HR</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </Box>
            <TextField
              id="contact"
              label="Contact"
              required
              variant="standard"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              id="designation"
              label="Designation"
              required
              variant="standard"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              id="address"
              label="Address"
              required
              variant="standard"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="dateJoined"
              label="Date Joined"
              required
              variant="standard"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              required
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="Password"
              label="Password"
              required
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="Gender"
              label="Gender"
              required
              variant="standard"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <Button onClick={handleAddEmployee}>ADD</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
