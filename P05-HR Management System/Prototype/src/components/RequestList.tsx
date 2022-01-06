import { useEffect, useState } from "react";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import requestListItems from "./requestListItems";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    listText: {
      text: "10px",
    },
    listbutton: {
      padding: 0,
    },
  })
);
export interface IRequestListProps {
  /**
   * the content of the title
   */
  title?: String;
  /**
   * content of the component, must be a node
   */
  children?: React.ReactNode;
}

const RequestList = (props: IRequestListProps) => {
  const [requestList, setrequestList] = useState([
    {
      title: "",
      description: "",
      link: "",
    },
  ]);

  const classes = useStyles();

  const getRequestList = () => {
    setrequestList(requestListItems);
  };

  useEffect(() => {
    getRequestList();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        // bgcolor: "red",
        position: "relative",
        overflow: "auto",
        maxHeight: 245,
        "& ul": { padding: 0 },
      }}
    >
      {requestList.map((item) => (
        // <li key={`section-${item}`}>
        <ul>
          <ListItem disableGutters key={`item-${item}`}>
            <ListItemButton
              className={classes.listbutton}
              key={`section-${item}`}
            >
              <PersonPinIcon />
              <Typography variant="subtitle2">{item.title}</Typography>
            </ListItemButton>
            <Divider />
          </ListItem>
        </ul>
      ))}
    </List>
  );
};

export default RequestList;
