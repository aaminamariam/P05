import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import EmployeeRequestListItem from "../../components/EmployeeRequestListItem";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";

import { IEmployeeListItemProps } from "../../components/EmployeeRequestListItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      // minWidth: 800,
    },
  })
);

export default function EmployeeRequestsList() {
  const classes = useStyles();
  const [list, setList] = useState([
    {
      title: "title",
      type: "type",
      data: "a quick brown fox jumps over teh lazy doggggg",
    },
    {
      title: "title",
      type: "type",
      data: "a quick brown fox jumps over teh lazy doggggg",
    },
    {
      title: "title",
      type: "type",
      data: "a quick brown fox jumps over teh lazy doggggg",
    },
  ]);

  return (
    <Box className={classes.root}>
      <List
        sx={{
          //   bgcolor: "background.paper",
          //   bgcolor: "red",
          position: "relative",
          overflow: "auto",
          maxHeight: 800,
          minWidth: 1200,
          "& ul": { padding: 0 },
        }}
      >
        {list.map((item) => (
          // <li key={`section-${item}`}>
          <ul>
            <EmployeeRequestListItem
              title={item.title}
              type={item.type}
              data={item.data}
            />
          </ul>
        ))}
      </List>
    </Box>
  );
}
