// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   CssBaseline,
//   makeStyles,
//   createStyles,
// } from "@material-ui/core";
// import Button, { ButtonProps } from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
// import axios from "axios";
// import Sidebarofapplication from "../components/Sidebarofapplication";
// import MenuIcon from "@material-ui/icons/Menu";
// import { styled } from "@mui/material/styles";
// import Stack from "@mui/material/Stack";
// import SendIcon from "@mui/icons-material/Send";
// import { Link } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
//
// const drawerWidth = 240;
// const w = `calc(100% - ${drawerWidth}px)`;
// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       display: "flex",
//     },
//     heading: {
//       flexGrow: 1,
//     },
//     menu: {
//       position: "relative",
//       right: "0.1%",
//       transform: "scale(1.5)",
//     },
//
//     notification: {
//       position: "absolute",
//       left: "85%",
//       transform: "scale(1.5)",
//     },
//     appbar: {
//       background: "white",
//       color: "black",
//       variant: "permanent",
//       anchor: "left",
//       height: 80,
//       width: w,
//       boxSizing: "border-box",
//     },
//     typo: {
//       position: "relative",
//     },
//     buttons: {
//       padding: "3% 0%",
//     },
//     backbutton: {
//       backgroundColor: "#371BB1",
//       justifyContent: "flex-start",
//     },
//     submitbutton: {
//       display: "flex",
//       // flexDirection: "row",
//       // // flex: 0.2,
//       // width: "100%",
//       justifyContent: "space-around",
//     },
//   })
// );
// const BootstrapButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   backgroundColor: "#371BB1",
// });
//
// const BackButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   backgroundColor: "#371BB1",
// });
//
// const AddReq = () => {
//   const classes = useStyles();
//   const [option, set_option] = useState("");
//   const [description, set_description] = useState("");
//   const [id, set_id] = useState("");
//   const handleChange = (event: any) => {
//     set_option(event.target.value);
//   };
//
//   const handleChangeDes = (event: any) => {
//     set_description(event.target.value);
//   };
//
//   //sub
//   const submitRequest = async () => {
//     let formField = new FormData();
//     formField.append("Option", option);
//     formField.append("Description", description);
//
//     console.log(formField);
//     await axios({
//       method: "post",
//       url: "localhost:5000/addreq",
//       data: formField,
//     }).then((response: { data: any }) => {
//       process.stdout.write(response.data);
//       alert("Your Request has been submitted");
//     });
//   };
//
//   return (
//     <div className={classes.root}>
//       <Sidebarofapplication />
//       <Box>
//         <CssBaseline />
//         <AppBar className={classes.appbar}>
//           <Toolbar>
//             <IconButton className={classes.menu}>
//               <MenuIcon />
//             </IconButton>
//             <Typography className={classes.typo} variant="h6">
//               Add Request
//             </Typography>
//             <IconButton className={classes.notification}>
//               <NotificationsNoneIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//
//         <Typography className={classes.typo} variant="h5">
//           Please provide the following information:
//         </Typography>
//
//         <Typography className={classes.typo} variant="h6">
//           EmployeeID:
//         </Typography>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="ID"
//           maxRows={4}
//           value={id}
//           onChange={(event: any) => set_id(event.target.value)}
//         />
//         <Typography className={classes.typo} variant="h6">
//           Reason:
//         </Typography>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Option</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={option}
//             label="Option"
//             onChange={handleChange}
//           >
//             <MenuItem value={"Leave"}>Leave</MenuItem>
//             <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
//             <MenuItem value={"Maternity Leave"}>Maternity Leave</MenuItem>
//             <MenuItem value={"Paternity Leave"}>Paternity Leave</MenuItem>
//             <MenuItem value={"Other"}>Other</MenuItem>
//           </Select>
//         </FormControl>
//         <div>
//           <Typography className={classes.typo} variant="h6">
//             Description:
//           </Typography>
//           <TextField
//             id="outlined-multiline-static"
//             label="Description"
//             multiline
//             rows={8}
//             value={description}
//             onChange={handleChangeDes}
//             variant="outlined"
//             fullWidth={true}
//           />
//         </div>
//         <Stack className={classes.buttons} direction="row" spacing={32}>
//           <Link
//             to="/employeedash"
//             style={{ textDecoration: "none", textDecorationColor: "white" }}
//           >
//             <BootstrapButton variant="contained" onClick={submitRequest}>
//               Back
//             </BootstrapButton>
//           </Link>
//           <BootstrapButton
//             variant="contained"
//             endIcon={<SendIcon />}
//             onClick={submitRequest}
//           >
//             Submit
//           </BootstrapButton>
//         </Stack>
//       </Box>
//       <CssBaseline />
//     </div>
//   );
// };
//
// export default AddReq;
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
  square: {
    color: "black",
    variant: "permanent",
    position: "absolute",
    left: "23%",
    top: "20%",
    width: "75%",
    height: "75%",
    boxSizing: "border-box",
    background: "#c4c4c4",
  },
  text: {
    background: "#ffffff",
  },
}));
const Form = () => {
  const classes = useStyles();

  // let history = useHistory();

  // create state variables for each input
  const [jobtitle, setJobtitle] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [departmentname, setDepartmentname] = useState("");
  const [location, setLocation] = useState("");

    const submitRequest = async () => {
      let formField = new FormData();
      formField.append("option", jobtitle);
      formField.append("description", jobdescription);
      formField.append("employeeID", location);


      console.log(formField);
      // await axios({
      //   method: "post",
      //   url: "http://localhost:5000/addreq",
      //   data: formField,
      // })
      await axios.post ("http://localhost:5000/addreq",{"option":jobtitle,
      "description":jobdescription,"employeeID":location})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    };

  return (
    <Box className={classes.square}>
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
          <Button
            style={{ backgroundColor: "#46b988", color: "#FFFFFF" }}
            onClick={submitRequest}
          >
            Upload
          </Button>

      </form>
    </Box>
  );
};

export default Form;
