import { useEffect, useState } from "react";
import axios from "axios";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Typography } from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";

// import requestListItems from "../../components/requestListItems";
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

const AnnouncementList = (props: IRequestListProps) => {
  const [requestList, setrequestList] = useState([
    {
      title: "",
      description: "",
      link: "",
    },
  ]);
  const [list, setList] = useState<any[]>([]);

  const classes = useStyles();

  const getRequestList = () => {
    // setrequestList(requestListItems);
  };

  const getreq = async () => {
    let x: any = [];
    try {
      const response = await axios.get("http://localhost:5001/getAnnouncements");
      // console.log(response.data.Items[0].comments);
      const li = response.data.Items;
      x = li;
      // console.log(li[0]);
      setList(x)
    } catch (error) {
      console.error(error);
    }
    // let a = [];

  };

  useEffect(() => {
    getRequestList();
    getreq();
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
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
    >
      {list.map((item) =>(
            <ListItem disableGutters key={`item-${item}`}>
              <ListItemButton
                className={classes.listbutton}
                key={`section-${item.id}`}
              >
                <AnnouncementIcon />
                <Typography variant="subtitle2">{item.title}</Typography>
              </ListItemButton>
              <Divider />
            </ListItem>
        )
      )}
    </List>
  );
};

export default AnnouncementList;
