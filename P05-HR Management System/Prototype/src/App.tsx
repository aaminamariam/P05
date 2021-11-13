// import React from "react";
import { Routes, Route } from "react-router-dom";
import HiringPortal from "./pages/Hiringportal";
import Addnewposting from "./pages/Addnewposting";
import AppPortal from "./pages/AppPortal";
import Home from "./pages/Home";
import HeaderBar from "./navigation/HeaderBar";
import JobApplication from './pages/JobApplication';


import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import NavBar from "./navigation/NavBar";

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
      width: w,
      height: 80,
      boxSizing: "border-box",
    },
    typo: {
      position: "relative",
      left: "5%",
    },
    box: {
      variant: "permanent",
      position: "relative",
      left: "20%",
      top: "20%",
      width: 1000,
      height: 480,
      boxSizing: "border-box",
      background: "#ffffff",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hiringportal" element={<HiringPortal />} />
        <Route path="/addnewposting" element={<Addnewposting />} />
        <Route path="/apportal" element={<AppPortal />} />
        <Route path="/jobapplication" element={<JobApplication/>}/>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
