import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import Popoverfunc from "../pages/EmployeeRequestsPage/Popup";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

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

  const addNewJob = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    let formField = new FormData();
    formField.append("job_title", jobtitle);
    formField.append("jd", jobdescription);
    formField.append("dept_name", departmentname);
    formField.append("location", location);
    console.log(formField);
    await axios({
      method: "post",
      url: "http://localhost:5001/jobs/jobpostings/",
      data: formField,
    }).then((response: { data: any }) => {});
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <NavLink to="/hiringportal">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={addNewJob}
            >
              Upload
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>Job has been posted</Typography>
            </Popover>
          </NavLink>
        </div>
      </form>
    </Box>
  );
};

export default Form;
