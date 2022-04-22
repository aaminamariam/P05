import {
  Button,
  makeStyles,
  createStyles,
  Card,
  Typography,
  Box,
  Paper,
  Drawer,
} from "@material-ui/core";

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

// import AddPosting from "./AddPosting";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: window.innerHeight - 150,
    },

    listheader: {
      display: "flex",
      flexDirection: "row",
      flex: "100%",
      width: "100%",
      justifyContent: "space-around",
      backgroundColor: "#371BB1",
    },
    listbody: {},
    menu: {
      position: "relative",
      right: "1%",
      transform: "scale(1)",
    },
    addpostingButton: {
      backgroundColor: "#46b988",
      color: "blue",
      textDecoration: "none",
    },

    card: {
      backgroundColor: "#371BB1",
      align: "center",
      display: "flex",
      minWidth: "100%",
      color: "#FFFFFF",
      textAlign: "center",
      borderRadius: "5px",
      justifyContent: "space-around",
    },

    del: {
      color: "#ffffff",
      postion: "relative",
      justifyContent: "space-around",
    },
    header: {
      fontWeight: "bold",
      fontSize: "10rem",
    },
    sqr: {
      color: "black",
      display: "flex",
      flexGrow: 1,
      left: "12%",
      top: "80%",
      width: "75%",
      height: "100%",
      // boxSizing: "border-box"  ,
    },
    footer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      flexGrow: 1,
    },
    appBar: {
      top: "auto",
      justifyContent: "center",
      backgroundColor: "#371BB1",
      // bottom: "90%"
    },
    paper: {
      background: "#ffffff",
      width: "100%",
      flexShrink: 0,
    },
  })
);
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}

const AppPortalPage = () => {
  const classes = useStyles();
  const Navigate = useNavigate();

  const [HiringPortalListItems, setHiringPortalListItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchJobs = async () => {
    const result = await axios.get("http://localhost:8000/apportal", {
      headers: { "access-token": getJwtToken() },
    });
    setHiringPortalListItems(result.data.Items);
  };
  const handleDelete = async (date_posted: string) => {
    const dlt = "http://localhost:8000/hiringportal/" + date_posted;
    // await axios.delete(dlt, { headers: { "access-token": getJwtToken() } });
    fetchJobs();
  };
  const toComponentB = (
    title: string,
    description: string,
    location: string,
    type: string
  ) => {
    Navigate("/jobapplication", {
      state: {
        title: title,
        description: description,
        location: location,
        type: type,
      },
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  fetchJobs();
  return (
    <>
      <Drawer
        classes={{ paper: classes.paper }}
        variant="permanent"
        anchor="left"
      >
        {/* <div className={classes.root}> */}
        {/* <AppBar color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.footer}>
            Job openings
          </Typography>
        </Toolbar>
      </AppBar> */}
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" className={classes.footer}>
              Job openings
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Box mt={10}>
            <Paper elevation={5}>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "hidden",
                  maxWidth: "80%",
                  // maxHeight: window.innerHeight - 150,
                  "& ul": { padding: 1 },
                }}
              >
                {HiringPortalListItems.map((item) => (
                  <ListItem key={item.date_posted}>
                    <Card
                      className={classes.card}
                      onClick={() => {
                        toComponentB(
                          item.title,
                          item.description,
                          item.location,
                          item.type
                        );
                      }}
                    >
                      <CardContent>
                        <ListItemText className={classes.header}>
                          {item.title}
                        </ListItemText>
                        <ListItemText>{item.location}</ListItemText>
                        <ListItemText>{item.type}</ListItemText>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </div>
      </Drawer>
    </>
  );
};
// function forceUpdate() {
//   throw new Error("Function not implemented.");
// }
export default AppPortalPage;
