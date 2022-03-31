import React, { useState } from "react";

import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@material-ui/core";
import theme from "../../components/theme";

export default function ToDo() {
  const [text, settext] = useState("");
  const [value, setValue] = React.useState(0);
  const [list, setList] = useState([
    {
      index: 1,
      checked: "True",
      data: "View employee requests",
    },
    {
      index: 2,
      checked: "False",
      data: "verify Yousuf's salary bonus",
    },
    {
      index: 3,
      checked: "True",
      data: "Complete promotion process for this ",
    },
  ]);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: { index: number; data: string }) => () => {
    const currentIndex = checked.indexOf(value.index);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value.index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const submitHandler = () => {
    
    setList([
      {
        index: list.length + 1,
        data: text,
        checked: "True",
      },
      ...list,
    ]);
    
    settext("");
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabPanel = (props: {
    [x: string]: any;
    children: any;
    value: any;
    index: any;
  }) => {
    const { children, value, index, ...other } = props;
 

    return (
      <ThemeProvider theme={theme}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            <Typography variant='h6'>{children}</Typography>
          </div>
        )}
      </div>
      </ThemeProvider>
    );
  };

  return (

    <div>
      {/* className={classes.container} */}
      <div>
        <TextField
          size="small"
          defaultValue=""
          value={text}
          onChange={(e) => settext(e.target.value)}
          // onSubmit={() => submitHandler()}
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={() => submitHandler()}
        >
          Add
        </Button>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Due" />
          <Tab label="Done" />
        </Tabs>
      </Box>
     
      <TabPanel value={value} index={0}>
        {checked.length < list.length + 1 ? (
          <List
            className="lissttttt"
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: "250px",
              paddingTop: "5px",
              paddingRight: "0px",
              marginTop: "5px",
              marginBottom: "5px",
              marginRight: "0px",
            }}
          >
            {/* list still ebign rendered */}
            {list.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              if (checked.indexOf(value.index) === -1) {
                return (
                  <ListItem
                    key={value.index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value.index) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value.data}`} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        ) : (
          <div> NO Tasks Due  </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {checked.length > 1 ? (
          <List
            className="lissttttt"
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 245,
              paddingTop: "0px",
            }}
          >
            {list.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              if (checked.indexOf(value.index) !== -1) {
                return (
                  <ListItem
                    key={value.index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value.index) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value.data}`} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        ) : (
          <div> Nothing done yet </div>
        )}
      </TabPanel>
    </div>
  
  );
}
