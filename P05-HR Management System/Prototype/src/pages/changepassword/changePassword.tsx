import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
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
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const getJwtToken = () => {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
};
const getid = () => {
  return parseJwt(getJwtToken()).id;
};
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
  rot2: {
    // display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    left: "12%",
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
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(7);
  const [helperText, setHelperText] = React.useState(
    "Password must be aleast 8 characters long and contain at least one number, one uppercase and one lowercase letter and one special character"
  );
  const navigate = useNavigate();

  const handlepassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewpass(event.target.value);
    setValidLength(newpass.length >= requiredLength ? true : false);
    setUpperCase(newpass.toUpperCase() !== newpass);
    setLowerCase(newpass.toLowerCase() !== newpass);
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(newpass));
    setHasNumber(/\d/.test(newpass));
    setMatch(newpass == retype);

    if (hasNumber && upperCase && lowerCase && specialChar && validLength) {
      console.log("all true");
      setHelperText("valid password");
    } else {
      setHelperText(
        "Password must be aleast 8 characters long and contain at least one number, one uppercase and one lowercase letter and one special character"
      );
    }
  };

  const submission = () => {
    // const checker = handlepassword();
    // if (0 == 0) {
    const data = {
      id: getid(),
      password: password,
      newpassword: newpass,
    };

    const headers = { "access-token": getJwtToken() };
    axios
      .post(
        "http://localhost:5001/changepassword",
        {
          id: getid(),
          password: password,
          newpassword: newpass,
        },
        {
          headers: { "access-token": getJwtToken() },
        }
      )
      .then((response: { data: any }) => {
        console.log(response.data);
        alert("Password has been updated");
      });
    console.log(data);
  };

  return (
    <Box
      className={classes.sqr}
      component="form"
      //   onSubmit={submission}
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
          onChange={(event) => setPassword(event.target.value)}
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
          onChange={handlepassword}
        />
        {/* <div className={classes.rot2}> */}
        <FormHelperText>{helperText}</FormHelperText>
        {/* </div> */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm password"
          label="Confirm password"
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
            <BootstrapButton
              //   type="submit"
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
