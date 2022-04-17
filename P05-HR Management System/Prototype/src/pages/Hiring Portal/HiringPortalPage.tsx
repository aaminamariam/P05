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
import Divider from "@mui/material/Divider";
import AddPosting from "./AddPosting";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import CardContent from "@material-ui/core/CardContent";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },

    listheader: {
      display: "flex",
      flexDirection: "row",

      width: "100%",
      justifyContent: "flex-end",
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
      minWidth: "100%",
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
      padding: theme.spacing(2),
    },
    clr: {
      backgroundColor: "#fc6404",
      color: "#ffffff",
      justifyContent: "space-around",
      padding: theme.spacing(2),
    },
    buttons: {
      justifyContent: "space-around",
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
  const Navigate = useNavigate();
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
  const nav = () => {
    Navigate("/addnewposting");
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  fetchJobs();
  return (
    <div className={classes.root}>
      <div className={classes.listbody}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            // maxHeight: window.innerHeight - 150,
            "& ul": { padding: 0 },
          }}
        >
          <Stack className={classes.buttons} direction="row">
            <Typography variant="h5" className={classes.footer}>
              Jobs
            </Typography>
            <div className={classes.listheader}>
              <Button variant="contained" onClick={nav} className={classes.clr}>
                Add Job
              </Button>

              <Divider variant="middle" flexItem={true} />
            </div>
          </Stack>
          {HiringPortalListItems.map((item) => (
            <ListItem key={item.date_posted}>
              <Card className={classes.card}>
                <CardContent>
                  <ListItemText className={classes.header}>
                    {item.title}
                  </ListItemText>
                  <ListItemText>{item.location}</ListItemText>
                  <ListItemText>{item.type}</ListItemText>
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
