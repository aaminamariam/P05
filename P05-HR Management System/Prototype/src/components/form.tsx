import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";

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
    background: "#c4c4c4",
  },
  text: {
    background: "#ffffff",
  },
}));
function Form() {
  const classes = useStyles();
  // create state variables for each input
  const [jobtitle, setJobtitle] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [location, setLocation] = useState("");

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
        <div>
          <Button style={{ backgroundColor: "#46b988", color: "#FFFFFF" }}>
            Upload
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default Form;
