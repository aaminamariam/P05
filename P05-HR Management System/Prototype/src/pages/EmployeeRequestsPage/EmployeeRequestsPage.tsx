import axios from "axios";
import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import List from "@mui/material/List";
import { createStyles, makeStyles } from "@mui/styles";

import EmployeeRequestListItem from "../../components/EmployeeRequestListItem";

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
    try {
      const response = await axios.get(
        "http://localhost:5001/getEmployeeRequests"
      );
      // console.log(response.data.Items[0].comments);
      const li = response.data.Items;
      setList([...list, li]);
    } catch (error) {
      console.error(error);
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
