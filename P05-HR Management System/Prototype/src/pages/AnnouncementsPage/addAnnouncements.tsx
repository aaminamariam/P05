import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  createStyles,
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const drawerWidth = 240;
const w = `calc(100% - ${drawerWidth}px)`;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
    heading: {
      flexGrow: 1,
    },
    menu: {
      position: "relative",
      right: "0.1%",
      transform: "scale(1.5)",
    },

    notification: {
      position: "absolute",
      left: "85%",
      transform: "scale(1.5)",
    },
    appbar: {
      background: "white",
      color: "black",
      variant: "permanent",
      anchor: "left",
      height: 80,
      width: w,
      boxSizing: "border-box",
    },
    typo: {
      position: "relative",
    },
    buttons: {
      padding: "3% 0%",
    },
    backbutton: {
      backgroundColor: "#371BB1",
      justifyContent: "flex-start",
    },
    submitbutton: {
      display: "flex",
      justifyContent: "space-around",
    },
    sqr: {
      color: "black",
      variant: "permanent",
      position: "absolute",
      left: "23%",
      top: "20%",
      width: "75%",
      height: "120%",
      boxSizing: "border-box",
    },
  })
);
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  backgroundColor: "#371BB1",
});

// const BackButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   backgroundColor: "#371BB1",
// });

const AddAnnouncements = () => {
  const classes = useStyles();
  const [id, set_id] = useState("");
  const [title, set_title] = useState("");
  const [aData, set_aData] = useState("");
  // const [date, set_date] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const handleChange = (event: any) => {
  //   set_id(event.target.value);
  // };

  // const handleChangeTitle = (event: any) => {
  //   set_title(event.target.value);
  // };

  const handleChangeData = (event: any) => {
    set_aData(event.target.value);
  };

  const is_empty = (option: string, description: string, id: string) => {
    if (title === "" || aData === "" || id === "") {
      if (title === "") {
        alert("title is empty");
      }
      if (aData === "") {
        alert("title is empty");
      }
      if (id === "") {
        alert("id is empty");
      }
      return 1;
    }
    return 0;
  };
  //sub
  const submitAnnouncement = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    const check = is_empty(title, aData, id);
    if (check === 0) {
      await axios({
        method: "post",
        url: "http://localhost:5001/addAnnouncements",
        data: { title: title, aData: aData, employeeID: id },
      }).then((response: { data: any }) => {
        console.log(response.data);
        //alert("Your Request has been submitted");
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const o = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <Box className={classes.sqr}>
        <Typography className={classes.typo} variant="h6">
          EmployeeID:
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="ID"
          maxRows={4}
          value={id}
          onChange={(event: any) => set_id(event.target.value)}
        />
        <Typography className={classes.typo} variant="h6">
          Title
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          rows={8}
          value={title}
          variant="outlined"
          fullWidth={true}
          onChange={(event: any) => set_title(event.target.value)}
        />

        <div>
          <Typography className={classes.typo} variant="h6">
            Description:
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            value={aData}
            onChange={handleChangeData}
            variant="outlined"
            fullWidth={true}
          />
        </div>
        <Stack className={classes.buttons} direction="row" spacing={"80%"}>
          <Link
            to="/"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <BootstrapButton variant="contained">Back</BootstrapButton>
          </Link>
          {/* <BootstrapButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={submitRequest}
          >
            Submit
          </BootstrapButton> */}
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={submitAnnouncement}
          >
            Submit
          </Button>
          <Popover
            id={o}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography>Announcement has been posted</Typography>
          </Popover>
        </Stack>
      </Box>
      <CssBaseline />
    </div>
  );
};

export default AddAnnouncements;
