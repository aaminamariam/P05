import * as React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

const HeaderBar = (props: any) => {
  const { customClass, handleDrawerToggle } = props;
  // const classes = useStyles();

  return (
    <React.Fragment>
      {/* <CssBaseline />
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton className={classes.menu}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.typo} variant="h6">
            HR Dashboard Home
          </Typography>
          <IconButton className={classes.notification}>
            <NotificationsNoneIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      <CssBaseline />
      <AppBar position="fixed" className={customClass.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={customClass.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HR Dashboard Home
          </Typography>
          <IconButton
            color="inherit"
            aria-label="notification"
            edge="end"
            onClick={handleDrawerToggle}
            className={customClass.notification}
          >
            <NotificationsNoneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default HeaderBar;
