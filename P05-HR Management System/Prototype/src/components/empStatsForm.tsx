import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
  buttons: {
    padding: "3% 0%",
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
  text: {
    background: "#ffffff",
    borderRadius: "50px",
  },
}));

const EmpStatsForm = () => {
  const classes = useStyles();
  const [comments, setComments] = useState("");
  const [id, setID] = useState("");
  const [rating, setRating] = useState("");
  const [leaves, setLeaves] = useState("");
  const [teamscore, setTeamScore] = useState("");
  const [hoursworked, setHoursWorked] = useState("");

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    backgroundColor: "rgba(253, 106, 0, 1)",
    textTransform: "none",
    fontSize: 16,
    color: "#ffffff",
  });
  const check = () => {
    if (
      id == "" ||
      rating == "" ||
      hoursworked == "" ||
      teamscore == "" ||
      hoursworked == ""
    ) {
      alert("a field is empty");
      return 1;
    }
    return 0;
  };
  const submission = async () => {
    const checker = check();
    if (checker == 0) {
      await axios({
        method: "put",
        url: "http://localhost:5001/addstats",
        data: {
          employeeID: id,
          rating: rating,
          hoursworked: hoursworked,
          comments: comments,
          teamworkScore: teamscore,
        },
      }).then((response: { data: any }) => {
        console.log(response.data);
        var today = new Date().toLocaleDateString();
        console.log(today);
        alert("Employee stats have been submitted");
      });
    }
  };
  return (
    <>
      <Box className={classes.sqr}>
        <form className={classes.rot}>
          <TextField
            className={classes.text}
            label="Employee ID"
            variant="outlined"
            required
            value={id}
            onChange={(e) => setID(e.target.value)}
            id="outlined-multiline-flexible"
            maxRows={4}
          />

          <FormControl style ={{width: '95%'}}>
            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rating}
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"7"}>7</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
              <MenuItem value={"9"}>9</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className={classes.text}
            id="outlined-multiline-flexible"
            maxRows={4}
            label="Team Score"
            variant="outlined"
            required
            value={teamscore}
            onChange={(e) => setTeamScore(e.target.value)}
          />

          <TextField
            className={classes.text}
            id="outlined-multiline-flexible"
            maxRows={4}
            label="Hours Worked"
            variant="outlined"
            required
            value={hoursworked}
            onChange={(e) => setHoursWorked(e.target.value)}
          />
          <TextField
            className={classes.text}
            id="outlined-multiline-static"
            label="Comments"
            required
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            multiline
            rows={8}
            variant="outlined"
            fullWidth={true}
          />
          <div>
            <Stack className={classes.buttons} direction="row" spacing={50}>
              <NavLink
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <BootstrapButton variant="contained">Back</BootstrapButton>
              </NavLink>
              <BootstrapButton
                variant="contained"
                endIcon={<SendIcon />}
                onClick={submission}
              >
                Submit
              </BootstrapButton>
            </Stack>
          </div>
        </form>
      </Box>
    </>
  );
};

export default EmpStatsForm;
