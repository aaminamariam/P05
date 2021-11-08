import React from 'react';
import {AppBar,Toolbar,Typography,IconButton,Box,Button,CssBaseline,makeStyles,createStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Sidebar from "./Sidebar";
import {NavLink} from "react-router-dom";
import Card from "./Card";
import Search from "./search";


const drawerWidth = 240;
const w=`calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
createStyles({
     root: {
       display: "flex",
       background : "#EBECF0"
     },
     heading: {
       flexGrow: 1,
     },
    menu:{
      position: "relative",
      right: "0.1%",
      transform: "scale(1.5)",
     },
    
    notification:{
      position: "absolute",
      left: "85%",
      transform: "scale(1.5)",
       },
      appbar: {
        background : "white",
        color:"black",
        variant:"permanent",
        anchor:"left",
        width: w,
        height:80,
        boxSizing: 'border-box',
      },
      typo: {
        position: "relative",
      left: "5%",

      },
      box:{
        variant:"permanent",
        position:"absolute",
        left:"20%",
        top:"20%",
        width: 1000,
        height:480,
        boxSizing: 'border-box',
        background : "#FFFFFF",
      },
     

   
  }));

export default function AppPortal() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebar/>
    <Box>
   
    <CssBaseline />
      <AppBar  className={classes.appbar}>
        <Toolbar>
        <IconButton className={classes.menu}>
              <MenuIcon/> 
        </IconButton>
        <Typography className={classes.typo} variant="h6">
            Application Portal
        </Typography>
          <IconButton className={classes.notification}>
              <NotificationsNoneIcon /> 
          </IconButton>
        </Toolbar>
      </AppBar>
      
     
    </Box>
 
    <Box className={classes.box}>
        <Search/>
    {/* <NavLink exact activeClassName="active_class" to="/addnewposting"> */}
      
      {/* </NavLink> */}
      <Card/>
    </Box>
    </div>
  );
}