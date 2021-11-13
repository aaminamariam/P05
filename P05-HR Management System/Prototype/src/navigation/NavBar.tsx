import {
  // Toolbar,
  // Box,
  Drawer,
  makeStyles,
  createStyles,
  List,
  ListItem,
  // ListItemText,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      flexGrow: 1,
    },
    white: {
      color: "white",
    },
    navbar_items: {
      textDecoration: "none",
      color: "white",
    },
    paper: {
      background: "#371bb1",
      // color: "white",
      width: drawerWidth,
      flexShrink: 0,
    },
  })
);
export default function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        classes={{ paper: classes.paper }}
        variant="permanent"
        anchor="left"
      >
        <div className="navbar">icon + heading</div>
        <nav>
          <List className={classes.navbar_items}>
            <ListItem button component={Link} to="/">
              Home
            </ListItem>
            <ListItem button component={Link} to="/hiringportal">
              Hiring Portal
            </ListItem>
            <ListItem button component={Link} to="/">
              Staff Directory
            </ListItem>
            <ListItem button component={Link} to="/">
              Requests
            </ListItem>
            <ListItem button component={Link} to="/apportal">
              App Portal
            </ListItem>
            <ListItem button component={Link} to="/">
              Announcements
            </ListItem>
            <ListItem button component={Link} to="/">
              Announcements
            </ListItem>
          </List>
        </nav>
      </Drawer>
    </div>
  );
}
