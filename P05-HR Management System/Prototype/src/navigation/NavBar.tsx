import {
  // Toolbar,
  // Box,
  Drawer,
  makeStyles,
  createStyles,
  List,
  ListItem,
  Toolbar,
  Divider,
  ListItemText,
  Hidden,
  // ListItemText,
} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Link } from "react-router-dom";
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    padding: theme.spacing(2),
  },
}));

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const NavBar = (props: any) => {
  const { window, customClass, handleDrawerToggle, mobileOpen } = props;
  const classes = useStyles();

  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const links = (
    <React.Fragment>
      <ListItem button component={Link} to="/">
        Home
      </ListItem>
      <ListItem button component={Link} to="/AnnouncementsPage">
        Announcements
      </ListItem>
      <ListItem button component={Link} to="/employeerequests">
        Requests
      </ListItem>
      <ListItem button component={Link} to="/employeedirectorypage">
        Employee Directory
      </ListItem>
      <ListItem button component={Link} to="/hiringportal">
        Hiring Portal
      </ListItem>
      <ListItem button component={Link} to="/apportal">
        App Portal
      </ListItem>
      <ListItem button component={Link} to="/jobapplication">
        Job Application
      </ListItem>
      <ListItem button component={Link} to="/employeedash">
        Employee Dash
      </ListItem>

      <ListItem button component={Link} to="/employeesanalytics">
        Employee Analytics
      </ListItem>

      <ListItem button component={Link} to="/view_resumes">
        View Applications
      </ListItem>

      <ListItem button component={Link} to="/empstats">
        Add Employee Stats
      </ListItem>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      {/* <Toolbar>
        <div className="navbar">icon + heading</div>
      </Toolbar>
      <Divider />
      <List>
        {links}
      </List>
      <Divider />
      <List>
        {links}
      </List> */}

      <Toolbar>
        {/* <div className="navbar"> */}
        <Stack direction="row" mt={2}>
          <Avatar className={classes.avatar} sx={{ bgcolor: deepOrange[500] }}>
            HR
          </Avatar>
          <Typography variant="h6" className={classes.title}>
            {parseJwt(getJwtToken()).name}
          </Typography>
        </Stack>
        {/* </div> */}
      </Toolbar>
      <Divider />
      <List>{links}</List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className={customClass.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: customClass.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: customClass.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
    // <div>
    //   <Drawer
    //     classes={{ paper: classes.paper }}
    //     variant="permanent"
    //     anchor="left"
    //   >
    //     <div className="navbar">icon + heading</div>
    //     <nav>
    //       <List className={classes.navbar_items}>
    //         <ListItem button component={Link} to="/">
    //           Home
    //         </ListItem>
    //         <ListItem button component={Link} to="/hiringportal">
    //           Hiring Portal
    //         </ListItem>
    //         <ListItem button component={Link} to="/">
    //           Staff Directory
    //         </ListItem>
    //         <ListItem button component={Link} to="/">
    //           Requests
    //         </ListItem>
    //         <ListItem button component={Link} to="/apportal">
    //           App Portal
    //         </ListItem>
    //         <ListItem button component={Link} to="/">
    //           Announcements
    //         </ListItem>
    //         <ListItem button component={Link} to="/">
    //           Announcements
    //         </ListItem>
    //       </List>
    //     </nav>
    //   </Drawer>
    // </div>
  );
};
export default NavBar;
