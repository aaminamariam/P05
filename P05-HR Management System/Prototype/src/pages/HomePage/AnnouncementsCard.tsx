import * as React from "react";
import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

import AnnouncementIcon from "@mui/icons-material/Announcement";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Link, NavLink } from "react-router-dom";

// import announcementListItems from "./announcementListItems";
import { useEffect, useState } from "react";
import axios from "axios";
import AddAnnouncements from "../AnnouncementsPage/addAnnouncements";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-around",
      // alignItems: "center",
      // paddingTop: "20px",
      // paddingBottom: "20px",
    },
    listText: {
      paddingLeft: 10,
      // fontSize: 16,
      // color: "rgba(0, 82, 221, 1)",
      // fontWeight: 500,
    },
    buttons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 5,
    },
    listbutton: {
      padding: 0,
      display: "flex",
    },
    icon: {
      color: "blue",
    },
  })
);
export interface IAnnouncementListProps {
  /**
   * the content of the title
   */
  title?: String;
}

export const AnnouncementCard = (props: IAnnouncementListProps) => {
  const classes = useStyles();
  // const [list, setList] = useState([
  //   {
  //     title: "",
  //   },
  // ]);
  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleGetAnnouncements = async () => {
    let x: any = [];
    try {
      const response = await axios.get(
        "http://localhost:5001/getAnnouncements"
      );
      const li = response.data.Items;
      x = li;
      setList(x);
      // console.log("ANNOUNCE ITEMS", li);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetAnnouncements();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <AddAnnouncements open={open} setOpen={setOpen} />
        <Link to="/AnnouncementsPage">
          <Button size="small">See History</Button>
        </Link>
      </div>
      {/* <CardActions> */}
      <List
        sx={{
          width: "100%",
          // maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { paddingTop: 0 },
        }}
      >
        {list.map((item) => (
          <ListItem disableGutters key={`item-${item}`}>
            {/* <ListItemButton
              className={classes.listbutton}
              key={`section-${item.id}`}
            > */}
            <AnnouncementIcon color="primary" />
            <Typography className={classes.listText} variant="subtitle1">
              {item.title}
            </Typography>
            {/* </ListItemButton> */}
            <Divider />
          </ListItem>
        ))}
      </List>
      {/* </CardActions> */}
    </div>
  );
};

export default AnnouncementCard;
