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
import { NavLink } from "react-router-dom";

// import announcementListItems from "./announcementListItems";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-around",
      // alignItems: "center",
      paddingTop: "20px",
    },
    listText: {
      text: "10px",
    },
    listbutton: {
      padding: 0,
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
  const [announcementList, setannouncementList] = useState([
    {
      title: "",
    },
  ]);
  const [list, setList] = useState<any[]>([]);

  const getreq = async () => {
    let x: any = [];
    try {
      const response = await axios.get(
        "http://localhost:5000/getAnnouncements"
      );
      const li = response.data.Items;
      x = li[0];
      // console.log(li[0].title);
    } catch (error) {
      console.error(error);
    }
    let a = [];
    try {
      for (let i = 0; i < x.title.length; i++) {
        a.push({
          title: x.title[i],
        });
        setList([...list, a]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getreq();
  }, []);
  return (
    <div className={classes.root}>
      <CardActions>
      <NavLink to ="/addAnnouncements">
        <Button color="primary" variant="outlined" size="medium">
          <Typography>Create Announcement</Typography>
        </Button>
        </NavLink>
        <Button size="small">See History</Button>
      </CardActions>
      <CardActions>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          {list.map((item) =>
            // <li key={`section-${item}`}>
            item.map((i: any) => (
              <ul>
                <ListItem disableGutters key={`item-${item}`}>
                  <ListItemButton
                    className={classes.listbutton}
                    key={`section-${item}`}
                  >
                    <AnnouncementIcon />
                    <Typography variant="subtitle2">{i.title}</Typography>
                  </ListItemButton>
                  <Divider />
                </ListItem>
              </ul>
            ))
          )}
        </List>
      </CardActions>
    </div>
  );
};

export default AnnouncementCard;
