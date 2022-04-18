import React from "react";
import { Route, Routes } from "react-router-dom";

import { makeStyles, Toolbar } from "@material-ui/core";
import HeaderBar from "./navigation/HeaderBar";
import NavBar from "./navigation/NavBar";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";
import AnnouncementsPage2 from "./pages/AnnouncementsPage/employeeAnnouncements";
import AppPortalPage from "./pages/AppPortalPage/AppPortalPage";
import EmployeeRequestsPageNew from "./pages/EmployeeRequestsPage/EmployeeRequestPageNew";
import HiringPortalPage from "./pages/Hiring Portal/HiringPortalPage";
import HomePage from "./pages/HomePage/HomePage";
import JobApplication from "./pages/JobApplication";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage/EmployeeDirectoryPage";
import Addnewposting from "./pages/Hiring Portal/Addnewposting";
import EmployeePortalPage from "./pages/EmployeePortalPage/EmployeePortalPage";
import View_Resumes from "./pages/view_applications/ViewApplications";
import EmployeesAnalytics from "./pages/EmployeePortalPage/EmployeeAnalytics";
import ReqHist from "./pages/Requestshistory/employeerequests";
import ToDo from "./components/ToDo/ToDo";
import ProtectedRoute from "./components/ProtectedRoute";
import EmpStatsForm from "./components/empStatsForm";
import AddReq from "./pages/addrequest/addrequest";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddAnnouncements from "./pages/AnnouncementsPage/addAnnouncements";
// import AddAnnouncements from "./pages/AnnouncementsPage/addAnnouncements";
import ChangePassword from "./pages/changepassword/changePassword";
import EmployeeNavBar from "./navigation/EmployeeNavBar";

const drawerWidth = 240;
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}
const getrole = () => {
  // const role = parseJwt(getJwtToken()).role;
  if (getJwtToken()) {
    return parseJwt(getJwtToken()).role;
  } else return null;
};
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
export function getloggedin() {
  const token = sessionStorage.getItem("loggedin");
  const name: string = token as string;
  if (name == "true") {
    return true;
  } else {
    return false;
  }
}

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(getloggedin());
  const [user, setUser] = React.useState<any | null>({
    role: [getrole()],
  });
  // {
  // role: [parseJwt(getJwtToken()).role],
  // }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const token = getJwtToken();

  return (
    <div className={classes.root}>
      <HeaderBar
        customClass={classes}
        handleDrawerToggle={handleDrawerToggle}
      />
      {loggedIn && (
        <NavBar
          customClass={classes}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      )}
      {loggedIn && ( 
        <EmployeeNavBar
          customClass={classes}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
      />
      )}
      <main className={classes.content}>
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hiringportal"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <HiringPortalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addnewposting"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <Addnewposting />
              </ProtectedRoute>
            }
          />

          <Route path="/apportal" element={<AppPortalPage />} />

          <Route
            path="/changepassword"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view_resumes"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <View_Resumes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employeedirectorypage"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <EmployeeDirectoryPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/employeerequests"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <EmployeeRequestsPageNew />
              </ProtectedRoute>
            }
          />

          <Route path="/jobapplication" element={<JobApplication />} />

          <Route
            path="/employeedash"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("Employee")}
              >
                <EmployeePortalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employeesanalytics"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("Employee")}
              >
                <EmployeesAnalytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addreq"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("Employee")}
              >
                <AddReq />
              </ProtectedRoute>
            }
          />

          <Route
            path="/todolist"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <ToDo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empstats"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <EmpStatsForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reqhist"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("Employee")}
              >
                <ReqHist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employeeannouncements"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <AnnouncementsPage2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AnnouncementsPage"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={!!user && user.role.includes("HR")}
              >
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
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
