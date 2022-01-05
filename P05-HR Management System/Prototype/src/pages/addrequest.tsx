import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import Button, { ButtonProps } from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import axios from "axios";
import Sidebarofapplication from "../components/Sidebarofapplication";
import MenuIcon from "@material-ui/icons/Menu";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { purple } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;
const w = `calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    heading: {
      flexGrow: 1,
    },
    menu: {
      position: "relative",
      right: "0.1%",
      transform: "scale(1.5)",
    },

    notification: {
      position: "absolute",
      left: "85%",
      transform: "scale(1.5)",
    },
    appbar: {
      background: "white",
      color: "black",
      variant: "permanent",
      anchor: "left",
      height: 80,
      width: w,
      boxSizing: "border-box",
    },
    typo: {
      position: "relative",
    },
  })
);

const AddReq = () => {
  const classes = useStyles();
  const [option, set_option] = useState("");
  const [description, set_description] = useState("");
  const [id, set_id] = useState("");
  const handleChange = (event: any) => {
    set_option(event.target.value);
  };

  const handleChangeDes = (event: any) => {
    set_description(event.target.value);
  };

  const submitRequest = async () => {
    let formField = new FormData();
    formField.append("Option", option);
    formField.append("Description", description);

    await axios({
      method: "post",
      url: "localhost:5000/addreq",
      data: formField,
    }).then((response: { data: any }) => {
      process.stdout.write(response.data);
      alert("Your Request has been submitted");
    });
  };

  return (
    <div className={classes.root}>
      <Sidebarofapplication />
      <Box>
        <CssBaseline />
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton className={classes.menu}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typo} variant="h6">
              Add Request
            </Typography>
            <IconButton className={classes.notification}>
              <NotificationsNoneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Typography className={classes.typo} variant="h5">
          Please provide the following information:
        </Typography>
        <Typography className={classes.typo} variant="h6">
          EmployeeID:
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="ID"
          maxRows={4}
          value={id}
          onChange={(event: any) => set_id(event.target.value)}
        />
        <Typography className={classes.typo} variant="h6">
          Reason:
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={option}
            label="Option"
            onChange={handleChange}
          >
            <MenuItem value={"Leave"}>Leave</MenuItem>
            <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
            <MenuItem value={"Maternity Leave"}>Maternity Leave</MenuItem>
            <MenuItem value={"Paternity Leave"}>Paternity Leave</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Typography className={classes.typo} variant="h6">
            Description:
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            value={description}
            onChange={handleChangeDes}
            variant="outlined"
          />
        </div>
        <Button
          className={classes.typo}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={submitRequest}
        >
          Submit
        </Button>
      </Box>
      <CssBaseline />
    </div>
  );
};

export default AddReq;
