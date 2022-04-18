import React, { useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    // position: "absolute",
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
    display: "flex",
    left: "50%",
    top: "10%",
    width: "100%",
    height: "100%",
    flexGrow: 1,
    // boxSizing: "border-box",
  },

  buttons: {
    justifyContent: "space-around",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "center",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  backgroundColor: "#fc6404",
});
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});
const Form = () => {
  const classes = useStyles();

  const Navigate = useNavigate();

  // create state variables for each input
  const [jobtitle, setJobtitle] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const addNewJob = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    await axios({
      method: "post",
      url: "http://localhost:8000/addnewposting",
      data: {
        title: jobtitle,
        description: jobdescription,
        department: departmentname,
        type: jobtype,
        location: location,
      },
    }).then((response: { data: any }) => {
      setOpen(true);
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Box mt={3}>
      <Paper elevation={5} className={classes.square}>
        <form className={classes.root}>
          <Typography variant="h5" className={classes.footer}>
            Add Job
          </Typography>
          <Divider variant="middle" />
          <TextField
            label="Job Title"
            variant="outlined"
            required
            value={jobtitle}
            onChange={(e) => setJobtitle(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Job Description"
            multiline
            rows={8}
            value={jobdescription}
            onChange={(e) => setJobdescription(e.target.value)}
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            label="Department name"
            variant="outlined"
            required
            value={departmentname}
            onChange={(e) => setDepartmentname(e.target.value)}
          />
          <TextField
            label="Location"
            variant="outlined"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <InputLabel id="demo-simple-select-label">Job type</InputLabel>
          <Select
            // labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={jobtype}
            label="Job type"
            variant="outlined"
            required
            sx={{ minWidth: "90%" }}
            onChange={(e) => setJobtype(e.target.value)}
          >
            <MenuItem value={"Remote"}>Remote</MenuItem>
            <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            <MenuItem value={"On-site"}>On-site</MenuItem>
          </Select>
          <div>
            <Stack className={classes.buttons} direction="row">
              {/* <Link
                to="/employeedash"
                style={{ textDecoration: "none", textDecorationColor: "white" }} */}
              {/* > */}
              <BootstrapButton onClick={() => Navigate(-1)} variant="contained">
                Back
              </BootstrapButton>
              {/* </Link> */}
              {/* <BootstrapButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submitRequest}
          >
            Submit
          </BootstrapButton> */}
              <BootstrapButton variant="contained" onClick={addNewJob}>
                Submit
              </BootstrapButton>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Job has been posted successfully
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default Form;
