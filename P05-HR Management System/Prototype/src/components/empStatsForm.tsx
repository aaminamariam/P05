import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  rot: {
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
  sqr: {
    color: "black",
    variant: "permanent",
    position: "absolute",
    left: "23%",
    top: "20%",
    width: "75%",
    height: "120%",
    boxSizing: "border-box",
    background: "#c4c4c4",
  },
  text: {
    background: "#ffffff",
    borderRadius: "50px",
  },
}));

const EmpStatsForm = () => {
  const classes = useStyles();
  const [comments, setcomments] = useState("");
  const [rating, setrating] = useState("");
  const [leaves, setleaves] = useState("");
  const [teamscore, setteamscore] = useState("");
  const [hoursworked, sethoursworked] = useState("");
  const [uploadFile, setUploadFile] = useState<any | null>(null);
  const submission = async () => {
    let formField = new FormData();
    formField.append("title", "CV");
    formField.append("document", uploadFile[0]);

    await axios({
      method: "post",
      url: "http://52.91.138.50:8000/upload/",
      data: formField,
    }).then((response: { data: any }) => {
      console.log(response.data);
      alert("Your Job application has been submitted");
    });
  };
  return (
    <>
      {/* <Box className={classes.sqr}> */}
      <form className={classes.rot}>
        <TextField
          className={classes.text}
          label="Rating"
          variant="filled"
          required
          value={rating}
          onChange={(e) => setrating(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Team Score"
          variant="filled"
          required
          value={teamscore}
          onChange={(e) => setteamscore(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Comments"
          variant="filled"
          required
          value={comments}
          onChange={(e) => setcomments(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Number of Leaves"
          variant="filled"
          required
          value={leaves}
          onChange={(e) => setleaves(e.target.value)}
        />
        <TextField
          className={classes.text}
          label="Hours Worked"
          variant="filled"
          required
          value={hoursworked}
          onChange={(e) => sethoursworked(e.target.value)}
        />

        {/* <Button
          variant="contained"
          component="label"
          style={{
            borderRadius: "50px",
            maxWidth: "270px",
            maxHeight: "50px",
            minWidth: "30px",
            minHeight: "30px",
            backgroundColor: "#ffffff",
            color: "grey",
          }}
        >
          Upload Cover Letter
          <input type="file" hidden />
        </Button>

        <Button
          variant="contained"
          component="label"
          style={{
            borderRadius: "50px",
            maxWidth: "170px",
            maxHeight: "50px",
            minWidth: "30px",
            minHeight: "30px",
            backgroundColor: "#ffffff",
            color: "grey",
          }}
        >
          Upload Resume
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files)}
            hidden
            required
          />
        </Button> */}
        <div>
          <NavLink to="/">
            <Button
              style={{
                backgroundColor: "#46b988",
                color: "#FFFFFF",
                maxWidth: "170px",
                minWidth: "100px",
                borderRadius: "50px",
              }}
              onClick={submission}
            >
              Submit
            </Button>
          </NavLink>
        </div>
      </form>
      {/* </Box> */}
    </>
  );
};

export default EmpStatsForm;
