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

import announcementListItems from "./announcementListItems";
import { useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
  // const [announcementList, setannouncementList] = useState([
  //   {
  //     title: "",
  //   },
  // ]);
  return (
    <div className={classes.root}>
      {/* <CardMedia>
        <AnnouncementIcon fontSize="large" />
      </CardMedia>
      <CardContent>
        <Typography variant="subtitle2">Make an announcement</Typography>
      </CardContent> */}
      <CardActions>
        <Button color="primary" variant="outlined" size="medium">
          <Typography>Create Announcement</Typography>
        </Button>
        <Button size="small">See History</Button>
      </CardActions>
      <CardActions>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            // bgcolor: "red",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          {announcementListItems.map((item) => (
            // <li key={`section-${item}`}>
            <ul>
              <ListItem disableGutters key={`item-${item}`}>
                <ListItemButton
                  className={classes.listbutton}
                  key={`section-${item}`}
                >
                  <AnnouncementIcon />
                  <Typography variant="subtitle2">{item.title}</Typography>
                </ListItemButton>
                <Divider />
              </ListItem>
            </ul>
          ))}
        </List>
      </CardActions>
    </div>
  );
};

export default AnnouncementCard;
