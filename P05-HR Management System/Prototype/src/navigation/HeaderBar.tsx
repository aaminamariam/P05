import * as React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobalContext } from "../components/GlobalContext";
import { useNavigate } from "react-router-dom";

export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}
export function getloggedin() {
  const token = sessionStorage.getItem("loggedin");
  const name: string = token as string;
  if (name == "true") {
    return true;
  } else {
    return false;
  }
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const HeaderBar = (props: any) => {
  const navigate = useNavigate();
  const { customClass, handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(getloggedin());

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/changepassword");
  };

  const handleClose2 = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/login");
  };
  // const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {loggedIn && (
        <div>
          <AppBar
            position="fixed"
            className={customClass.appBar}
            color="default"
          >
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

              <Typography variant="h5" noWrap>
                Welcome {parseJwt(getJwtToken()).name}
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
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>change password</MenuItem>
                <div onClick={handleClose2}>
                  <MenuItem sx={{ color: "red" }}>Logout</MenuItem>
                </div>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </React.Fragment>
  );
};
export default HeaderBar;
