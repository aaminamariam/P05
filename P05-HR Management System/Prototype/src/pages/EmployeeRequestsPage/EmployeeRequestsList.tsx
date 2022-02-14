import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import EmployeeRequestListItem from "../../components/EmployeeRequestListItem";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import requestListItems from "../../components/requestListItems";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    sqr: {
      color: "black",
      variant: "permanent",
      position: "absolute",
      left: "25%",
      right: "25%",
      width: "50%",
      height: "120%",
      boxSizing: "border-box",
    },
  })
);

export default function EmployeeRequestsList() {
  const classes = useStyles();
  const [list, setList] = useState<any[]>([]);

  const getreq = async () => {
    let x: any = [];
    try {
      const response = await axios.get("http://52.91.138.50:5000/activereq");
      // console.log(response.data.Items[0].comments);
      const li = response.data.Items;
      x = li;
      // console.log(li[0]);
    } catch (error) {
      console.error(error);
    }
    let a = [];
    for (let i = 0; i < x.length; i++) {
      a.push({
        title: x[i].name,
        type: x[i].option,
        data: x[i].description,
        id: x[i].employeeID,
      });
      setList([...list, a]);
    }
  };

  useEffect(() => {
    getreq();
  }, []);
  return (
    <Box className={classes.sqr}>
      <List
        sx={{
          // bgcolor: "background.paper",
          //   bgcolor: "red",
          position: "relative",
          overflow: "auto",
          maxHeight: 800,
          minWidth: 1200,
          "& ul": { padding: 0 },
        }}
      >
        {list.map((item) =>
          // <li key={`section-${i}`}>
          // {console.log(item);}
          item.map((i: any) => (
            <ul>
              <EmployeeRequestListItem
                title={i.title}
                type={i.type}
                data={i.data}
                id={i.id}
              />
            </ul>
            // </li>
          ))
        )}
      </List>
      {/* <h1>{list[0].title}</h1> */}
    </Box>
  );
}
