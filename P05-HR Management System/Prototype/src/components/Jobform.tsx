import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";
// import { pdf_parser } from "./parser";

const useStyles = makeStyles((theme) => ({
  rot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(2),
    position: "absolute",
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
  sqr: {
    color: "black",
    variant: "permanent",
    position: "absolute",
    left: "12%",
    top: "20%",
    width: "75%",
    height: "100%",
    boxSizing: "border-box",
  },
  text: {
    display: "flex",
    background: "#ffffff",
    borderRadius: "50px",
    justifyContent: "flex-end",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
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
      <Box>
        <Paper elevation={5} className={classes.sqr}>
          <Typography variant="h4" className={classes.footer}>
            Job:{location.state.title}
          </Typography>
          <Typography variant="h6" className={classes.footer}>
            Location:{location.state.location}
          </Typography>
          <form className={classes.rot}>
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your Application has been successfully submitted.
              </Alert>
            </Snackbar>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Form;
