// import React from "react";
import { Routes, Route } from "react-router-dom";
import HiringPortal from "./pages/Hiringportal";
import Addnewposting from "./pages/Addnewposting";
import AppPortal from "./pages/AppPortal";
import Home from "./pages/Home";
import HeaderBar from "./navigation/HeaderBar";

import { Box, makeStyles, createStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import NavBar from "./navigation/NavBar";

const drawerWidth = 240;
const appBarHeight = 60;
const w = `calc(100% - ${drawerWidth}px)`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },

    box: {
      display: "flex",
      position: "relative",
      left: drawerWidth + 15,
      top: "100px",
      // maxWidth: window.innerWidth - drawerWidth - 30,
      width: "82%",
      // height: window.innerHeight - appBarHeight - 60,
      height: "90%",
      background: "red",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <HeaderBar />
      <Box className={classes.box}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiringportal" element={<HiringPortal />} />
          <Route path="/addnewposting" element={<Addnewposting />} />
          <Route path="/apportal" element={<AppPortal />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
