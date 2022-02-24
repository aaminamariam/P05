import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReplayOutlined } from "@mui/icons-material";

// import handleGetAnnouncements from "./AnnouncementsPage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAnnouncements(props: {
  setOpen: (arg0: boolean) => any;
  open: boolean;
}) {
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const classes = useStyles();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

  // const handleGetAnnouncements = prhandleGetAnnouncements;

  const handleAddAnnouncement = async () => {
    // setAnchorEl(event.currentTarget);
    // const check = is_empty(title, aData, id);
    // if (check == 0) {
    await axios({
      method: "post",
      url: "http://localhost:5001/addNewAnnouncement",
      data: {
        postedBy: name,
        department: department,
        title: title,
        data: data,
      },
    });
    props.setOpen(false);
    // reload()
    // props.callhandleGetRequests();
  };

  return (
    <div>
      <Button onClick={handleOpen}>ADD ANNOUNCEMENTS</Button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes.root}>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="department"
              label="Department"
              variant="standard"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <TextField
              id="title"
              label="Title"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="data"
              label="Announcement"
              variant="standard"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <Button onClick={handleAddAnnouncement}>ADD</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
