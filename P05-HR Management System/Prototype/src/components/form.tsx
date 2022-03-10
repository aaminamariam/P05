import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

 
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    position: "absolute",
    top: "7%",
    left: "12%",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "600px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  square: {
    color: "black",
    variant: "permanent",
    position: "absolute",
    left: "23%",
    top: "20%",
    width: "75%",
    height: "75%",
    boxSizing: "border-box",
    //background: "#c4c4c4",
  },
  text: {
    background: "#ffffff",
  },
}));
const Form = () => {
  const classes = useStyles();

  // let history = useHistory();

  // create state variables for each input
  const [jobtitle, setJobtitle] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addNewJob = async () => {

    const data = {
    title:jobtitle,
    description:jobdescription,
    dept: departmentname,
    location: location,
    }
    console.log(data, "ff");
    await axios({
      method: "post",
      url: "http://localhost:8000/addnewposting",
      data: {
        title:jobtitle,
        description:jobdescription,
        dept: departmentname,
        location: location,
      }
    }).then((response: { data: any }) => {    setOpen(true);});

  };




  return (
    <Box className={classes.square}>
      <form className={classes.root}>
        <TextField
          className={classes.text}
          label="Job Title"
          variant="filled"
          required
          value={jobtitle}
          onChange={(e) => setJobtitle(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Job Description"
          variant="filled"
          required
          value={jobdescription}
          onChange={(e) => setJobdescription(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Department name"
          variant="filled"
          required
          value={departmentname}
          onChange={(e) => setDepartmentname(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Location"
          variant="filled"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* <NavLink to="/hiringportal">
          <Button
            style={{ backgroundColor: "#46b988", color: "#FFFFFF" }}
            onClick={addNewJob}
          >
            Upload
          </Button>
        </NavLink> */}
        <div>

            <Button

              variant="contained"
              onClick={addNewJob}
            >
              Upload
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Success the job has been posted!
        </Alert>
      </Snackbar>

        </div>
      </form>
    </Box>
  );
};

export default Form;

