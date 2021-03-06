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
import Sidebarofapplication from "../components/Sidebarofapplication";
import Jobform from "../components/Jobform";

const drawerWidth = 240;
const w = `calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    heading: {
      flexGrow: 1,
    },
    menu: {
      position: "relative",
      right: "0.1%",
      transform: "scale(1.5)",
    },

    notification: {
      position: "absolute",
      left: "85%",
      transform: "scale(1.5)",
    },
    appbar: {
      background: "white",
      color: "black",
      variant: "permanent",
      anchor: "left",
      width: w,
      height: 80,
      boxSizing: "border-box",
    },
    typo: {
      position: "relative",
      left: "5%",
    },
  })
);

const JobApplication = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebarofapplication />
      <Box>
        <CssBaseline />
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton className={classes.menu}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.typo} variant="h6">
              Job Application
            </Typography>
            <IconButton className={classes.notification}>
              <NotificationsNoneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <CssBaseline />
      <Jobform />
    </div>
  );
};
export default JobApplication;
