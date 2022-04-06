import { makeStyles, createStyles, Grid } from "@material-ui/core";

import StatCard from "../../components/StatCard";

import EnhancedCard from "../../components/EnhancedCard";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOffIcon from "@material-ui/icons/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link } from "react-router-dom";
import { useState } from "react";

import RequestList from "../EmployeeRequestsPage/RequestList";
// import ReqHist from "../Requestshistory/employeerequests";
import AnnouncementList from "./AnnouncementsList";

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

const EmployeePortalPage = () => {
  const classes = useStyles();
  const [job_openeings, setjob_openeings] = useState("0");

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.stats}>
        <Grid item>
          <Link
            to="/employeesanalytics"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StatCard
              icon={<LeaderboardIcon />}
              title="Performance statistics"
            />
          </Link>
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
            to="/addreq"
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
          <Link
            to="/reqhist"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <EnhancedCard title="Requests">
              <RequestList />
            </EnhancedCard>
          </Link>
        </Grid>

        <Grid item>
          <Link
            to="/getAnnouncements"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <EnhancedCard title="Announcements">
              <AnnouncementList />
            </EnhancedCard>
          </Link>
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
export default EmployeePortalPage;
