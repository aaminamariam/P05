import * as React from "react";
import {
  makeStyles,
  createStyles,
  CardContent,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
} from "@material-ui/core";

import AnnouncementIcon from "@mui/icons-material/Announcement";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: "20px",
    },
    stats: {},
    content: {},
  })
);

export interface ICreatAnnouncementProps {}

export const CreatAnnouncement = (props: ICreatAnnouncementProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CardMedia>
        <AnnouncementIcon fontSize="large" />
      </CardMedia>
      <CardContent>
        <Typography variant="subtitle2">Make an announcement</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="outlined" size="medium">
          <Typography>Create Announcement</Typography>
        </Button>
        <Button size="small">See History</Button>
      </CardActions>
    </div>
  );
};
