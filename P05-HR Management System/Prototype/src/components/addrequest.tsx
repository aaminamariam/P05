import React, { useState } from "react";
import {
  Typography,
  Box,
  CssBaseline,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";

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
    buttons: {
      padding: "3% 0%",
    },
    backbutton: {
      backgroundColor: "#371BB1",
      justifyContent: "flex-start",
    },
    submitbutton: {
      display: "flex",
      justifyContent: "space-around",
    },
    sqr: {
      color: "black",
      variant: "permanent",
      position: "absolute",
      left: "23%",
      top: "20%",
      width: "75%",
      height: "120%",
      boxSizing: "border-box",
    },
  })
);
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  backgroundColor: "#371BB1",
});

// const BackButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   backgroundColor: "#371BB1",
// });

const AddReq = () => {
  const classes = useStyles();
  const [type, set_type] = useState("");
  const [data, set_data] = useState("");
  const [id, set_id] = useState("");
  const [title, set_title] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleChange = (event: any) => {
    set_type(event.target.value);
  };

  const handleChangeDes = (event: any) => {
    set_data(event.target.value);
  };

  const handleChangeTitle = (event: any) => {
    set_title(event.target.value);
  };

  const is_empty = (type: string, title: string, data: string, id: string) => {
    if (type === "" || data === "" || id === "" || title === "") {
      alert("a field is empty");
      return 1;
    }
    return 0;
  };
  //sub
  const submitRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const check = is_empty(type, title, data, id);
    if (check === 0) {
      await axios({
        method: "post",
        url: "http://localhost:5001/addreq",
        data: { type: type, title:title, data: data, id: id },
      }).then((response: { data: any }) => {
        console.log(response.data);
        //alert("Your Request has been submitted");
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const o = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <Box className={classes.sqr}>
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
          Title:
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          maxRows={10}
          value={title}
          fullWidth={true}
          onChange={handleChangeTitle}
        />  
        <Typography className={classes.typo} variant="h6">
          Reason:
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
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
            value={data}
            onChange={handleChangeDes}
            variant="outlined"
            fullWidth={true}
          />
        </div>
        <Stack className={classes.buttons} direction="row" spacing={"80%"}>
          <Link
            to="/employeedash"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <BootstrapButton variant="contained">Back</BootstrapButton>
          </Link>
          {/* <BootstrapButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submitRequest}
          >
            Submit
          </BootstrapButton> */}
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={submitRequest}
          >
            Submit
          </Button>
          <Popover
            id={o}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography>Request has been posted</Typography>
          </Popover>
        </Stack>
      </Box>
      <CssBaseline />
    </div>
  );
};

export default AddReq;
