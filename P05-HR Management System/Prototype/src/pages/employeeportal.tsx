import { makeStyles, createStyles, Grid, Typography } from "@material-ui/core";

import StatCard from "../components/StatCard";

import EnhancedCard from "../components/EnhancedCard";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOffIcon from "@material-ui/icons/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { CreatAnnouncement } from "../components/CreateAnnouncement";
import RequestList from "../components/RequestList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "#FF0000",
    },
    stats: {
      display: "flex",
    },
    content: {
      marginTop: "25px",
    },
  })
);
// function changeBackground(e: any) {
//   e.target.style.background = "black";
// }
// const changeBackground_white(e: any) {
//     e.target.style.background = "green";
//   }
const EmployeeDash = () => {
  const classes = useStyles();
  const [job_openeings, setjob_openeings] = useState("0");

  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://52.91.138.50:8000/jobs/jobpostings/"
  //       );
  //       console.log(response.data.length);
  //       setjob_openeings(response.data.length.toString());
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   useEffect(() => {
  //     getUser();
  //   }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.stats}>
        <Grid item>
          <StatCard icon={<LeaderboardIcon />} title="Performance statistics" />
        </Grid>
        <Grid item>
          <StatCard
            icon={<PersonOffIcon />}
            title="Number on Leave"
            data="32"
          />
        </Grid>
        <Grid
          item
          //   onMouseEnter={changeBackground}
          //     onMouseLeave={changeBackground_white}
        >
          <Link
            to="/add_req"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StatCard icon={<PersonAddIcon />} title="Add requests" />
          </Link>
        </Grid>
        <Grid item>
          <StatCard
            icon={<MonetizationOnIcon />}
            title="Next payroll"
            data="25th August"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.content}>
        <Grid item>
          <EnhancedCard title="Employee Gender">SHOW</EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Requests">
            <RequestList />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Create Announcement">
            <CreatAnnouncement />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Employee Turnover">SHOW</EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Employee Retention">SHOW</EnhancedCard>
        </Grid>
      </Grid>
    </div>
  );
};
export default EmployeeDash;
