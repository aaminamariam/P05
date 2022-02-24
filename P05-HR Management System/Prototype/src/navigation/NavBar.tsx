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

import { Link } from "react-router-dom";

// const drawerWidth = 240;

// const useStyles = makeStyles(() =>
//   createStyles({
//     heading: {
//       flexGrow: 1,
//     },
//     white: {
//       color: "white",
//     },
//     navbar_items: {
//       textDecoration: "none",
//       color: "white",
//     },
//     paper: {
//       background: "#371bb1",
//       // color: "white",
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//     drawerPaper: {
//       width: drawerWidth,
//     },
//   })
// );

const NavBar = (props: any) => {
  const { window, customClass, handleDrawerToggle, mobileOpen } = props;
  // const classes = useStyles();

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
      <ListItem button component={Link} to="/employeedirectory">
        Employee Directory
      </ListItem>
      <ListItem button component={Link} to="/hiringportal">
        Hiring Portal
      </ListItem>
      <ListItem button component={Link} to="/apportal">
        App Portal
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
        <div className="navbar">icon + heading</div>
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
