import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import HistoryListItem from "../../components/histlist";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import axios from "axios";

import { IEmployeeListItemProps } from "../../components/EmployeeRequestListItem";
import requestListItems from "../../components/requestListItems";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      // justifyContent: "center",
    },
    sqr: {
      color: "black",
      variant: "permanent",
      position: "absolute",
      left: "25%",
      right: "25%",
      top: "20%",
      width: "50%",
      height: "120%",
      boxSizing: "border-box",
    },
  })
);

const ReqHist = () => {
  const classes = useStyles();
  const [list, setList] = useState<any[]>([]);
  const [id, getID] = useState<any>("4");
  const link = "http://localhost:5000/getrequests/" + id;

  const getreq = async () => {
    let x: any = [];
    try {
      const response = await axios.get(link);
      // console.log(response.data.Items[0].comments);
      const li = response.data.Items;
      x = li;
      console.log(li[0]);
    } catch (error) {
      console.error(error);
    }
    let a = [];
    let b = [];
    const c = x[0].previous_description.length;
    const popts = x[0].previous_options;
    const pdes = x[0].previous_description;
    const papv = x[0].previous_description;
    const des = x[0].description;
    const opt = x[0].option;
    const name = x[0].name;

    // setList([...list, b]);

    for (let i = 0; i < c; i++) {
      a.push({
        title: name,
        type: popts[i],
        data: pdes[i],
        //pdata : x[i].previous_description
        active: "inactive",
      });
    }
    a.push({
      title: name,
      type: opt,
      data: pdes,
      //pdata : x[i].previous_description
      active: "active",
    });
    setList([...list, a]);
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
          // maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {list.map((item) =>
          item.map((i: any) => (
            <ul>
              <HistoryListItem
                title={i.title}
                type={i.type}
                active={i.active}
                data={i.data}
              />
            </ul>
            // </li>
          ))
        )}
      </List>
    </Box>
  );
};
export default ReqHist;
