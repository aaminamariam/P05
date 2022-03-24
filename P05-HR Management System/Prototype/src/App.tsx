import React from "react";
import { Route, Routes } from "react-router-dom";

import { makeStyles, Toolbar } from "@material-ui/core";

import HeaderBar from "./navigation/HeaderBar";
import NavBar from "./navigation/NavBar";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";
import AppPortalPage from "./pages/AppPortalPage/AppPortalPage";
import EmployeeRequestsPageNew from "./pages/EmployeeRequestsPage/EmployeeRequestPageNew";

import HiringPortalPage from "./pages/Hiring Portal/HiringPortalPage";
import HomePage from "./pages/HomePage/HomePage";
import JobApplication from "./pages/JobApplication";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage/EmployeeDirectoryPage";
import Addnewposting from "./pages/Hiring Portal/Addnewposting";
import EmployeePortalPage from "./pages/EmployeePortalPage/EmployeePortalPage";
import EmployeesAnalytics from "./pages/EmployeePortalPage/EmployeeAnalytics";
import ReqHist from "./pages/Requestshistory/employeerequests";
import ToDo from "./components/ToDo/ToDo";
import EmpStatsForm from "./components/empStatsForm";
import AddReq from "./components/addrequest";
import AddAnnouncements from "./pages/AnnouncementsPage/addAnnouncements";
import LoginPage from "./pages/LoginPage/LoginPage";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hiringportal" element={<HiringPortalPage />} />
          <Route path="/addnewposting" element={<Addnewposting />} />
          <Route path="/apportal" element={<AppPortalPage />} />
          <Route
            path="/employeedirectorypage"
            element={<EmployeeDirectoryPage />}
          />
          <Route
            path="/employeerequests"
            element={<EmployeeRequestsPageNew />}
          />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/employeedash" element={<EmployeePortalPage />} />
          <Route path="/employeesanalytics" element={<EmployeesAnalytics />} />
          <Route path="/addreq" element={<AddReq />} />
          <Route path="/todolist" element={<ToDo />} />
          <Route path="/empstats" element={<EmpStatsForm />} />
          <Route path="/reqhist" element={<ReqHist />} />
          {/* <Route path="/addAnnouncements" element={<AddAnnouncements />} /> */}
          <Route path="/AnnouncementsPage" element={<AnnouncementsPage />} />
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
