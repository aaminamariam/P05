import {
  Button,
  makeStyles,
  createStyles,
  Card,
  Typography,
} from "@material-ui/core";

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

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
      flex: 0.2,
      width: "100%",
      justifyContent: "space-around",
    },
    listbody: {},
    menu: {
      position: "relative",
      right: "0.1%",
      transform: "scale(1.5)",
    },
    addpostingButton: {
      backgroundColor: "#46b988",
      color: "blue",
      textDecoration: "none",
    },

    card: {
      backgroundColor: "#371BB1",
      align: "inherit",
      minWidth: "90%",
      color: "#FFFFFF",
      textAlign: "center",
      borderRadius: "20px",
    },

    del: {
      color: "#ffffff",
      postion: "relative",
    },
    header: {
      fontWeight: "bold",
      fontSize: "10rem",
    },
  })
);

const Hiringportal = () => {
  const classes = useStyles();

  const [HiringPortalListItems, setHiringPortalListItems] = useState<any[]>([]);

  const fetchJobs = async () => {
    const result = await axios.get(
      "http://localhost:5001/jobs/jobpostings/"
    );
    // console.log(result.data)
    setHiringPortalListItems(result.data);
    // console.log(HiringPortalListItems)
  };
  const handleDelete = async (id: string) => {
    const link = "http://localhost:5001/jobs/jobpostings/";
    const clink = link.concat(id);
    const del_link = clink.concat("/");
    const result = await axios.delete(del_link);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.listheader}>
        {/* LIST HEADER */}
        {/* <div>Search Bar</div> */}
        <Link
          to="/addnewposting"
          style={{ textDecoration: "none", textDecorationColor: "white" }}
        >
          <Button className={classes.addpostingButton}>
            <Typography
              style={{
                textDecoration: "inherit",
              }}
            >
              Add Posting
            </Typography>
          </Button>
        </Link>
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
                <CardContent>
                  <ListItemText className={classes.header}>
                    {item.job_title}
                  </ListItemText>
                  <ListItemText>{item.description}</ListItemText>
                  <ListItemText>{item.location}</ListItemText>
                  <Button
                    component="div"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    aria-label="delete"
                    className={classes.del}
                  >
                    <DeleteIcon />
                  </Button>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
// function forceUpdate() {
//   throw new Error("Function not implemented.");
// }
export default Hiringportal;
