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

import { Box, makeStyles, createStyles, Toolbar } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ToDo from "./components/ToDo/ToDo";

import NavBar from "./navigation/NavBar";
import JobApplication from "./pages/JobApplication";
import React from "react";
import EmployeesAnalytics from "./pages/employeesanalytics";

const drawerWidth = 240;
// const appBarHeight = 60;
// const w = `calc(100% - ${drawerWidth}px)`;

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       display: "flex",
//       backgroundColor: "#EBECF0",
//     },

//     box: {
//       display: "flex",
//       // flexDirection: "row",
//       position: "relative",
//       left: drawerWidth + 15,
//       top: "100px",
//       // maxWidth: window.innerWidth - drawerWidth - 30,
//       width: "85%",
//       // height: window.innerHeight - appBarHeight - 60,
//       height: "90%",
//       margin: '0 auto'
//       // background: "red",
//     },
//   })
// );

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  notification: {
    marginLeft: 'auto'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#371BB1',
    color: 'white'
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

  // const classes = useStyles();
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <HeaderBar customClass={classes} handleDrawerToggle={handleDrawerToggle} />
      <NavBar customClass={classes} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <main className={classes.content}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiringportal" element={<HiringPortal />} />
          <Route path="/addnewposting" element={<Addnewposting />} />
          <Route path="/apportal" element={<AppPortal />} />
          <Route path="/jobapplication" element={<JobApplication />} />
          <Route path="/employeedash" element={<EmployeeDash />} />
          <Route path="/employeesanalytics" element={<EmployeesAnalytics />} />
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
      </main>
    </div>
  );

  // return (
  //   <>
  //     <NavBar />
  //     <HeaderBar />
  //     <Box className={classes.box}>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/hiringportal" element={<HiringPortal />} />
  //         <Route path="/addnewposting" element={<Addnewposting />} />
  //         <Route path="/apportal" element={<AppPortal />} />
  //         <Route path="/jobapplication" element={<JobApplication />} />
  //         <Route path="/employeedash" element={<EmployeeDash />} />
  //         <Route path="/addreq" element={<AddReq />} />
  //         <Route path="/todolist" element={<ToDo />} />
  //         <Route path="/empstats" element={<EmpStatsForm />} />

  //         <Route
  //           path="*"
  //           element={
  //             <main style={{ padding: "1rem" }}>
  //               <p>There's nothing here!</p>
  //             </main>
  //           }
  //         />
  //       </Routes>
  //     </Box>
  //   </>
  // );
}

export default App