import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";

// import requestListItems from "./requestListItems";

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
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 200,
        "& ul": { padding: 0 },
      }}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            {[0, 1, 2].map((item) => (
              <ListItem disableGutters key={`item-${sectionId}-${item}`}>
                <ListItemButton>
                  <ListItemText primary={`Item ${item}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default RequestList;
