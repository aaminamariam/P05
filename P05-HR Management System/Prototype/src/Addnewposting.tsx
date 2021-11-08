import React from "react";
import Sidebar from "./Sidebar";
import {AppBar,Toolbar,Typography,IconButton,Box,CssBaseline,makeStyles,createStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Form from "./form";

const drawerWidth = 240;
const w=`calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
createStyles({
     root: {
       display: "flex",
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
     
     

   
  }));

export default function Addnewposting() {
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
            Add Job Posting
        </Typography>
          <IconButton className={classes.notification}>
              <NotificationsNoneIcon /> 
          </IconButton>
        </Toolbar>
      </AppBar>
      
     
    </Box>
    
        <CssBaseline /> 
        <Form />
   
 
  
    </div>
  );
}

