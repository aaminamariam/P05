import React, { useState } from "react";
import { makeStyles, Drawer } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
// import { pdf_parser } from "./parser";

const useStyles = makeStyles((theme) => ({
  rot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(2),
    top: "7%",
    left: "12%",
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "600px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    background: "#ffffff",
    width: "100%",
    flexShrink: 0,
  },
  sqr: {
    color: "black",
    position: "absolute",
    left: "12%",
    top: "10%",
    width: "75%",
    height: "100%",
    boxSizing: "border-box",
  },
  text: {
    display: "flex",
    background: "#ffffff",
    borderRadius: "5px",
    justifyContent: "flex-end",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  des: {
    display: "flex",
    justifyContent: "center",
    textAlign: "left",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    justifyContent: "center",
    backgroundColor: "#371BB1",
    // bottom: "90%"
  },
}));
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

const Form = () => {
  const classes = useStyles();
  const [name, setname] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [linkedinprofile, setlinkedinprofile] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [email, setemail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [uploadFile, setUploadFile] = useState<any | null>(null);
  const location = useLocation();

  const submission = async () => {
    let formField = new FormData();
    // formField.append("title", "CV");
    formField.append("document", uploadFile[0]);
    const name =
      Math.random().toString(36).substring(2, 7) + uploadFile[0].name;
    const link =
      "https://yw2d4umwc5.execute-api.us-east-1.amazonaws.com/devdep/mycvandresumebucket/" +
      name;
    console.log(uploadFile[0]);
    const cv_link = "https://mycvandresumebucket.s3.amazonaws.com/" + name;
    await axios({ method: "put", url: link, data: uploadFile[0] });
    await axios({
      method: "put",
      url: "http://localhost:5001/addresume_info",
      data: {
        name: name,
        city: city,
        linkedin: linkedinprofile,
        phone: phoneno,
        email: email,
        cv: cv_link,
        sp: state,
        job: location.state.title,
      },
    }).then(() => {
      setOpen(true);
    });

    // pdf_parser(uploadFile[0]);
    //   console.log(uploadFile[0]);
    //   axios({
    //     method: "post",
    //     url: "http://localhost:8000/parsedcv",
    //     data: formField,
    //   });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <>
      <Drawer
        classes={{ paper: classes.paper }}
        variant="permanent"
        anchor="left"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" className={classes.footer}>
              Job:{location.state.title}
            </Typography>
            <Typography variant="h6" className={classes.footer}>
              Location:{location.state.location}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          <Paper elevation={5} className={classes.sqr}>
            <Typography variant="h5" className={classes.footer}>
              Job Description
            </Typography>
            <Typography variant="body2" className={classes.des} gutterBottom>
              {location.state.description}
            </Typography>
            <Divider variant="middle" />
            <form className={classes.rot}>
              <Box mt={3}>
                <Typography variant="h5" className={classes.footer}>
                  Job Application
                </Typography>
                <TextField
                  className={classes.text}
                  label="Full Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <TextField
                  className={classes.text}
                  label="Phone Number"
                  variant="outlined"
                  required
                  value={phoneno}
                  onChange={(e) => setphoneno(e.target.value)}
                />
                <TextField
                  className={classes.text}
                  label="Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <TextField
                  className={classes.text}
                  label="LinkedInProfileUrl"
                  variant="outlined"
                  required
                  value={linkedinprofile}
                  onChange={(e) => setlinkedinprofile(e.target.value)}
                />
                <TextField
                  className={classes.text}
                  label="City"
                  variant="outlined"
                  required
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
                <TextField
                  className={classes.text}
                  label="state/Province"
                  variant="outlined"
                  required
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />

                {/* <Button
          variant="contained"
          component="label"
          style={{
            borderRadius: "50px",
            maxWidth: "270px",
            maxHeight: "50px",
            minWidth: "30px",
            minHeight: "30px",
            backgroundColor: "#ffffff",
            color: "grey",
          }}
        >
          Upload Cover Letter
          <input type="file" hidden />
        </Button> */}

                <Button
                  variant="contained"
                  component="label"
                  style={{
                    borderRadius: "5px",
                    maxWidth: "170px",
                    maxHeight: "50px",
                    minWidth: "30px",
                    minHeight: "30px",
                    backgroundColor: "#ffffff",
                    color: "grey",
                  }}
                >
                  Upload Resume
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files)}
                    hidden
                    required
                  />
                </Button>
                <div>
                  <Button
                    style={{
                      backgroundColor: "#46b988",
                      color: "#FFFFFF",
                      maxWidth: "170px",
                      minWidth: "100px",
                      borderRadius: "5px",
                    }}
                    variant="outlined"
                    onClick={submission}
                  >
                    Submit
                  </Button>
                </div>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Your Application has been successfully submitted.
                  </Alert>
                </Snackbar>
              </Box>
            </form>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
};

export default Form;
