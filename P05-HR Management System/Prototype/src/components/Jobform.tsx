import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import axios from "axios";

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
    left: "23%",
    top: "20%",
    width: "75%",
    height: "120%",
    boxSizing: "border-box",
  },
  text: {
    background: "#ffffff",
    borderRadius: "50px",
  },
}));
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

  const submission = async () => {
    let formField = new FormData();
    formField.append("title", "CV");
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
      },
    }).then(() => {
      setOpen(true);
    });
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
      <Box className={classes.sqr}>
        <form className={classes.rot}>
          <TextField
            className={classes.text}
            label="Full Name"
            variant="filled"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="Phone Number"
            variant="filled"
            required
            value={phoneno}
            onChange={(e) => setphoneno(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="Email"
            variant="filled"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="LinkedInProfileUrl"
            variant="filled"
            required
            value={linkedinprofile}
            onChange={(e) => setlinkedinprofile(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="City"
            variant="filled"
            required
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <TextField
            className={classes.text}
            label="state/Province"
            variant="filled"
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
              borderRadius: "50px",
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
                borderRadius: "50px",
              }}
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
      </Box>
    </>
  );
};

export default Form;
