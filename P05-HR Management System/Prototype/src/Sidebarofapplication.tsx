import React from 'react';
import {Toolbar,Box,Drawer,makeStyles,createStyles,List,Divider,ListItem,ListItemText} from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles(() =>
createStyles({
     heading: {
       flexGrow: 1,
     },
     white: {
         color: "white",
       },
       listitems: {
        margin: "auto",
      },
      paper: {
        background: "#371bb1",
        color:"white",
        width: drawerWidth,
        flexShrink: 0,
      },

    },
   
  ));
export default function Sidebarofapplication(){
    const classes = useStyles();
    return <>
     <Drawer classes={{ paper: classes.paper }}
     variant="permanent"
     anchor="left"
     
>
      <Toolbar />
      <Divider />
      <List className={classes.listitems}> 
        {['Home'].map((text, index) =>
        <ListItem button key={text}>
        <ListItemText primary={text} />
        </ListItem>
     )}
      </List>
      <Divider />
  
       </Drawer>
        <Box>
        <Toolbar />
       
      </Box>


    </>

}