<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import JobApplication from "./JobApplication";
import {
  IconButton,
  Button,
  makeStyles,
  createStyles,
  Card,
  Typography,
  Box,
} from "@material-ui/core";
=======
import { Box, makeStyles, createStyles } from "@material-ui/core";

>>>>>>> develop
// import Card from "../components/HiringPOrtal";
import Search from "../components/search";

const drawerWidth = 240;
const w = `calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: window.innerHeight - 150,
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
      position: "absolute",
      left: "20%",
      top: "20%",
      width: 1000,
      height: 480,
      boxSizing: "border-box",
      background: "#FFFFFF",
    },
    listbody: {},
    card: {
      backgroundColor: "#371BB1",
      align: "inherit",
      minWidth: "90%",
      color: "#FFFFFF",
      textAlign: "center",
      borderRadius: "20px",
    },
    header: {
      fontWeight: "bold",
      fontSize: "10rem",
    },

    listheader: {
      display: "flex",
      flexDirection: "row",
      flex: 0.2,
      width: "100%",
      justifyContent: "space-around",
    },
    addpostingButton: {
      backgroundColor: "#46b988",
      color: "blue",
      textDecoration: "none",
    },
  })
);
const AppPortal = () => {
  const classes = useStyles();
  const [HiringPortalListItems, setHiringPortalListItems] = useState<any[]>([]);

  const fetchJobs = async () => {
    const result = await axios.get(
      "http://52.91.138.50:8000/jobs/jobpostings/"
    );
    // console.log(result.data)
    setHiringPortalListItems(result.data);
    // console.log(HiringPortalListItems)
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    // {/* <Box className={classes.box}> */}
    // {/* <Search /> */}
    // {/* <NavLink exact activeClassName="active_class" to="/addnewposting"> */}

<<<<<<< HEAD
    // {/* </NavLink> */}
    // {/* <Card /> */}
    <div className={classes.root}>
      <div className={classes.listheader}>
        {/* LIST HEADER */}
        {/* <div>Search Bar</div> */}
      </div>
      <div className={classes.listbody}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: window.innerHeight - 150,
            "& ul": { padding: 0 },
          }}
        >
          {HiringPortalListItems.map((item) => (
            <ListItem key={item}>
              <Card className={classes.card}>
                <Link
                  to="/jobapplication"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <ListItemText className={classes.header}>
                      {item.job_title}
                    </ListItemText>
                    <ListItemText>{item.description}</ListItemText>
                    <ListItemText>{item.location}</ListItemText>
                  </CardContent>
                </Link>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
      {/* </Box> */}
=======
        {/* </NavLink> */}
        {/* <Card /> */}
      </Box>
>>>>>>> develop
    </div>
  );
};
export default AppPortal;
