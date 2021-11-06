import React from "react";
import './Hiringportal.css';
import {AppBar,Toolbar,Typography,IconButton,Button,makeStyles,createStyles,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";


const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      flexGrow: 1,
    },
    white: {
        color: "white",
      },
    
  })
);

function Hiringportal(){
    const classes = useStyles();
    return <>
    <div class="split left">
        <div className="centered">
            <p>Home</p>
            <p>Hiring Portal</p>
            <p>Staff Directory</p>
            <p>Requests</p>
            <p>Announcements</p>

        </div>
    </div>
    <AppBar>
        <Toolbar>
          <IconButton className={classes.white}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.heading}>
            Hiring Portal
          </Typography>
          <IconButton className={classes.white}>
            {/* <NotificationsNoneIcon/> */}
          </IconButton>
        </Toolbar>
      </AppBar> 
    </>


}

export default Hiringportal;
