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

import AddPosting from "./AddPosting";
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
      align: "inherit",
      minWidth: "90%",
      color: "#FFFFFF",
      textAlign: "center",
      borderRadius: "20px",
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
    footer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}

const Hiringportal = () => {
  const classes = useStyles();

  const [HiringPortalListItems, setHiringPortalListItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchJobs = async () => {
    const result = await axios.get("http://localhost:8000/hiringportal", {
      headers: { "access-token": getJwtToken() },
    });
    setHiringPortalListItems(result.data.Items);
  };
  const handleDelete = async (date_posted: string) => {
    const dlt = "http://localhost:8000/hiringportal/" + date_posted;
    await axios.delete(dlt, { headers: { "access-token": getJwtToken() } });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  fetchJobs();
  return (
    <div className={classes.root}>
      <div className={classes.listheader}>
        <AddPosting setOpen={setModalOpen} open={modalOpen} />
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
          <Typography variant="h4" className={classes.footer}>
            Job Openings
          </Typography>
          {HiringPortalListItems.map((item) => (
            <ListItem key={item.date_posted}>
              <Card className={classes.card}>
                <CardContent>
                  <ListItemText className={classes.header}>
                    {item.title}
                  </ListItemText>
                  <ListItemText>{item.location}</ListItemText>
                  <Button
                    component="div"
                    onClick={() => {
                      handleDelete(item.date_posted);
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
