import React, { useState } from 'react';
import {Toolbar,Box,Paper,Drawer,makeStyles,TextField,Typography,Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
const drawerWidth = 740;
const useStyles = makeStyles(theme => ({
      paper: {
        background: "#371bb1",
        width: drawerWidth,
        flexShrink: 0,
      },
      login: {
        maxWidth: 160,
      },
      box:{
        variant:"permanent",
        position:"absolute",
        left:"43%",
        top:"20%",
        width: "30%",
        height:"75%",
        boxSizing: 'border-box',
        background : "#ffffff",
      },
      form:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        position:"absolute",
        top:"20%",
        left:"63%",
        '& .MuiTextField-root': {
          margin: theme.spacing(2),
          width: '300px',
        },
        '& .MuiButtonBase-root': {
          margin: theme.spacing(2),
        },
      },
      text:{
        background : "#ffffff",
      },
      typo:{
        position:"relative",
        top:"1%",
        left:"64%",
      }
      

    }
   
  ));
  export default function Login(){
    const classes = useStyles();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    return <>
    <Drawer classes={{ paper: classes.paper }}
    variant="permanent"
    anchor="left"
    
    >
         
      
        
      </Drawer>

      <Box className={classes.box}>
      <Typography variant="h4" className={classes.typo}>Welcome to HRMS</Typography> 
       <form className={classes.form}>
           <TextField  className={classes.text}
               label="Username"
               variant="filled"
               required
               value={username}
               onChange={e => setusername(e.target.value)}
              
           />
           <TextField className={classes.text}
               label="Password"
               variant="filled"
               required
               value={password}
               onChange={e => setpassword(e.target.value)}
           />
        </form>
        <NavLink exact activeClassName="active_class" to="/hiringportal">
        <Button style={{backgroundColor: '#371bb1', color: '#FFFFFF',maxWidth: '170px', minWidth: '100px',position:"absolute",  top:"71%",
        left:"125%"}}>
          Sign In
         </Button>
         </NavLink>
    </Box>
    <img src="login.PNG" alt="" />

   </>
  
}
