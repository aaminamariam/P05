// import React from "react";
import { Routes, Route } from "react-router-dom";
import HiringPortal from "./pages/Hiringportal";
import Addnewposting from "./pages/Addnewposting";
import AppPortal from "./pages/AppPortal";
import Home from "./pages/Home/Home";
import HeaderBar from "./navigation/HeaderBar";
import EmployeeDash from "./pages/employeeportal";
import AddReq from "./pages/addrequest";
import EmpStatsForm from "./pages/empStatsForm";

import { makeStyles, Toolbar } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ToDo from "./components/ToDo/ToDo";

import NavBar from "./navigation/NavBar";
import JobApplication from "./pages/JobApplication";
import ReqHist from "./pages/Requestshistory/employeerequests";
import EmployeeRequestsList from "./pages/EmployeeRequestsPage/EmployeeRequestsPage";
import React from "react";
import EmployeesAnalytics from "./pages/employeesanalytics";
import EmployeeDirectory from "./pages/EmployeeDirectory/EmployeeDirectory";
import AddAnnouncements from "./pages/AddAnnouncements";
import AnnouncementsHist from "./pages/AnnouncementsHist";

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
          <Route path="/" element={<Home />} />
          <Route path="/hiringportal" element={<HiringPortal />} />
          <Route path="/addnewposting" element={<Addnewposting />} />
          <Route path="/apportal" element={<AppPortal />} />
          <Route path="/employee-directory" element={<EmployeeDirectory />} />
          <Route path="/employeerequests" element={<EmployeeRequestsList />} />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/employeedash" element={<EmployeeDash />} />
          <Route path="/employeesanalytics" element={<EmployeesAnalytics />} />
          <Route path="/addreq" element={<AddReq />} />
          <Route path="/todolist" element={<ToDo />} />
          <Route path="/empstats" element={<EmpStatsForm />} />
          <Route path="/reqhist" element={<ReqHist />} />
          <Route path="/addAnnouncements" element={<AddAnnouncements />} />
          <Route path="/getAnnouncements" element={<AnnouncementsHist />} />
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
