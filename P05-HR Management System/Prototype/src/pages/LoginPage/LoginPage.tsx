import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  makeStyles,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const drawerWidth = 740;
const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#ffffff",
    width: drawerWidth,
    // flexShrink: 0,
    Width: "100%",
  },
  loginPage: {
    maxWidth: 160,
  },
  box: {
    variant: "permanent",
    position: "absolute",
    left: "43%",
    top: "20%",
    width: "30%",
    height: "75%",
    boxSizing: "border-box",
    background: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    position: "absolute",
    top: "20%",
    left: "63%",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  text: {
    background: "#ffffff",
  },
  typo: {
    position: "relative",
    top: "1%",
    left: "64%",
  },
}));
const getSessionStorageOrDefault = (key: string, defaultValue: Boolean) => {
  const stored = sessionStorage.getItem(key);
  console.log(stored);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
};
export default function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(
    getSessionStorageOrDefault("terms", false)
  );
  const login = async (username: any, password: any) => {
    console.log(username, password);
    await axios({
      method: "post",
      url: "http://localhost:5001/login",
      data: {
        id: username,
        password: password,
      },
    }).then((response) => {
      const check = response.data;
      if (check == "success") {
        navigate("/");
      } else {
        console.log(check);
        setusername("");
        setpassword("");
      }
    });
  };
  useEffect(() => {
    sessionStorage.setItem("terms", JSON.stringify(termsAccepted));
  }, [termsAccepted]);
  return (
    <>
      <Drawer classes={{ paper: classes.paper }} variant="permanent"></Drawer>

      <Box className={classes.box}>
        <Typography variant="h4" className={classes.typo}>
          Welcome to HRMS
        </Typography>
        <form className={classes.form}>
          <TextField
            className={classes.text}
            label="Username"
            variant="filled"
            required
            value={username}
            onChange={(e: any) => setusername(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="Password"
            variant="filled"
            required
            value={password}
            onChange={(e: any) => setpassword(e.target.value)}
          />
        </form>
        <Button
          onClick={(e: any) => login(username, password)}
          style={{
            backgroundColor: "#371bb1",
            color: "#FFFFFF",
            maxWidth: "170px",
            minWidth: "100px",
            position: "absolute",
            top: "71%",
            left: "125%",
          }}
        >
          Sign In
        </Button>
      </Box>
      <img src="loginPage.PNG" alt="" />
    </>
  );
}
