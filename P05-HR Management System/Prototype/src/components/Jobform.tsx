import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const submission = () => {
    alert("Your Job application has been submitted");
};

const useStyles = makeStyles((theme) => ({
    rot: {
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
    sqr: {
        color: "black",
        variant: "permanent",
        position: "absolute",
        left: "23%",
        top: "20%",
        width: "75%",
        height: "120%",
        boxSizing: "border-box",
        background: "#c4c4c4",
    },
    text: {
        background: "#ffffff",
        borderRadius: "50px",
    },
}));
function Form() {
    const classes = useStyles();
    const [name, setname] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [linkedinprofile, setlinkedinprofile] = useState("");
    const [location, setlocation] = useState("");
    const [email, setemail] = useState("");

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
                        label="Location"
                        variant="filled"
                        required
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                    />

                    <Button
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
                    </Button>

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
                        <input type="file" hidden required />
                    </Button>
                    <div>
                        <NavLink to="/hiringportal">
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
                        </NavLink>
                    </div>
                </form>
            </Box>
        </>
    );
}

export default Form;
