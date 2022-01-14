// import React from "react";
import { Routes, Route } from "react-router-dom";
import HiringPortal from "./pages/Hiringportal";
import Addnewposting from "./pages/Addnewposting";
import AppPortal from "./pages/AppPortal";
import Home from "./pages/Home/Home";
import HeaderBar from "./navigation/HeaderBar";
import EmployeeDash from "./pages/employeeportal";
import AddReq from "./pages/addrequest";
import EmpStatsForm from "./components/empStatsForm";

import { Box, makeStyles, createStyles } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ToDo from "./components/ToDo/ToDo";

import NavBar from "./navigation/NavBar";
import JobApplication from "./pages/JobApplication";

const drawerWidth = 240;
const appBarHeight = 60;
const w = `calc(100% - ${drawerWidth}px)`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#EBECF0",
    },

    box: {
      display: "flex",
      // flexDirection: "row",
      position: "relative",
      left: drawerWidth + 15,
      top: "100px",
      // maxWidth: window.innerWidth - drawerWidth - 30,
      width: "82%",
      // height: window.innerHeight - appBarHeight - 60,
      height: "90%",
      // background: "red",
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
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/employeedash" element={<EmployeeDash />} />
          <Route path="/addreq" element={<AddReq />} />
          <Route path="/todolist" element={<ToDo />} />
          <Route path="/empstats" element={<EmpStatsForm />} />

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
