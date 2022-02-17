import React from "react";
import { Route, Routes } from "react-router-dom";

import { makeStyles, Toolbar } from "@material-ui/core";

import HeaderBar from "./navigation/HeaderBar";
import NavBar from "./navigation/NavBar";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";
import AppPortalPage from "./pages/AppPortalPage/AppPortalPage";
import EmployeeDirectoryPage from "./pages/EmployeeDirectory/EmployeeDirectoryPage";
import EmployeeRequestsPage from "./pages/EmployeeRequestsPage/EmployeeRequestsPage";
import HiringPortalPage from "./pages/Hiring Portal/HiringPortalPage";
import HomePage from "./pages/Home/HomePage";
import JobApplication from "./pages/JobApplication";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  notification: {
    marginLeft: "auto",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#371BB1",
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <HeaderBar
        customClass={classes}
        handleDrawerToggle={handleDrawerToggle}
      />
      <NavBar
        customClass={classes}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hiringportal" element={<HiringPortalPage />} />
          <Route path="/apportal" element={<AppPortalPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route
            path="/employeedirectory"
            element={<EmployeeDirectoryPage />}
          />
          <Route path="/employeerequests" element={<EmployeeRequestsPage />} />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
