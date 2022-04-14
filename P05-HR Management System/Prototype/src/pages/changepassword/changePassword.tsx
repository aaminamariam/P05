import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  backgroundColor: "rgba(253, 106, 0, 1)",
  textTransform: "none",
  fontSize: 16,
  color: "#ffffff",
});

const useStyles = makeStyles((theme) => ({
  rot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "Space between",
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
    borderRadius: "5px",
  },
}));
const ChangePassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [newpass, setnewpass] = useState("");
  const [retype, setretype] = useState("");
  //   const [password, setPassword] = useState({
  //     firstPassword: '',
  //     secondPassword: ''
  //   })
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8);
  const navigate = useNavigate();
  const submission = () => {
    // const checker = check();
    // if (0 == 0) {
    //   await axios({
    //     method: "put",
    //     url: "http://localhost:5001/addstats",
    //     data: {
    //       employeeID: id,
    //       rating: rating,
    //       hoursworked: hoursworked,
    //       comments: comments,
    //       teamworkScore: teamscore,
    //     },
    //   }).then((response: { data: any }) => {
    //     console.log(response.data);
    //     var today = new Date().toLocaleDateString();
    //     console.log(today);
    //     alert("Employee stats have been submitted");
    //   });
    // }
    alert("hi");
    setHasNumber(/\d/.test(newpass));
    console.log("match", hasNumber);
  };

  useEffect(() => {
    setValidLength(newpass.length >= requiredLength ? true : false);
    setUpperCase(newpass.toLowerCase() !== newpass);
    setLowerCase(newpass.toUpperCase() !== newpass);
    setHasNumber(/\d/.test(newpass));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(newpass));
  }, []);
  return (
    <Box
      className={classes.sqr}
      component="form"
      //   noValidate
      sx={{ mt: 1 }}
    >
      <form className={classes.rot}>
        <Typography variant="h4" noWrap>
          Change Password
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Current password"
          type="password"
          id="password"
          variant="outlined"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="new password"
          label="New password"
          type="password"
          id="password"
          variant="outlined"
          value={newpass}
          onChange={(e) => setnewpass(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="new password"
          label="New password"
          type="password"
          id="password"
          variant="outlined"
          autoComplete="new password"
          value={retype}
          onChange={(e) => setretype(e.target.value)}
        />
        <div>
          <Stack className={classes.buttons} direction="row" spacing={50}>
            <BootstrapButton variant="contained" onClick={() => navigate(-1)}>
              Back
            </BootstrapButton>
            {/* </NavLink> */}
            <BootstrapButton
              type="submit"
              variant="contained"
              onClick={submission}
              endIcon={<SendIcon />}
            >
              Submit
            </BootstrapButton>
          </Stack>
        </div>
      </form>
    </Box>
  );
};
export default ChangePassword;
