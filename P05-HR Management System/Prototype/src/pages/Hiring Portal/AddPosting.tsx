import axios from "axios";
import { useState } from "react";

import { PersonAdd } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Form from "../../components/form";

import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";
import Popover from "@mui/material/Popover";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    text: {
      background: "#ffffff",
    },
    square: {
      // color: "black",
      // variant: "permanent",
      // position: "absolute",
      // left: "23%",
      // top: "20%",
      // width: "75%",
      // height: "75%",
      // boxSizing: "border-box",
      //background: "#c4c4c4",
    },
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

export interface IAddEmployeeProps {
  setOpen: (arg0: boolean) => any;
  open: boolean;
}
export default function AddEmployee(props: IAddEmployeeProps) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const [jobtitle, setJobtitle] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const addNewJob = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    let formField = new FormData();
    formField.append("job_title", jobtitle);
    formField.append("jd", jobdescription);
    formField.append("dept_name", departmentname);
    formField.append("location", location);
    console.log(formField);
    await axios({
      method: "post",
      url: "http://localhost:5001/jobs/jobpostings/",
      data: formField,
    }).then((response: { data: any }) => {});
  };

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button onClick={handleOpen} startIcon={<PersonAdd />}>
        ADD POSTING
      </Button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.square}>
          <form className={classes.root}>
            <TextField
              className={classes.text}
              label="Job Title"
              variant="filled"
              required
              value={jobtitle}
              onChange={(e) => setJobtitle(e.target.value)}
            />
            <TextField
              className={classes.text}
              label="Job Description"
              variant="filled"
              required
              value={jobdescription}
              onChange={(e) => setJobdescription(e.target.value)}
            />
            <TextField
              className={classes.text}
              label="Department name"
              variant="filled"
              required
              value={departmentname}
              onChange={(e) => setDepartmentname(e.target.value)}
            />
            <TextField
              className={classes.text}
              label="Location"
              variant="filled"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {/* <NavLink to="/hiringportal">
          <Button
            style={{ backgroundColor: "#46b988", color: "#FFFFFF" }}
            onClick={addNewJob}
          >
            Upload
          </Button>
        </NavLink> */}
            <div>
              <NavLink to="/hiringportal">
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={addNewJob}
                >
                  Upload
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>Job has been posted</Typography>
                </Popover>
              </NavLink>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
