import { makeStyles, createStyles, Grid } from "@material-ui/core";

import StatCard from "../../components/StatCard";

import EnhancedCard from "../../components/EnhancedCard";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import KeyIcon from "@mui/icons-material/Key";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ToDo from "../../components/ToDo/ToDo";
import RequestList from "../EmployeeRequestsPage/RequestList";
import ReqHist from "../Requestshistory/employeerequests";
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
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

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
              icon={<LeaderboardIcon fontSize="large" />}
              title="Performance statistics"
            />
          </Link>
        </Grid>
        <Grid item>
          <StatCard
            icon={<KeyIcon fontSize="large" />}
            title="change password"
          />
        </Grid>
        <Grid item>
          <Link
            to="/addreq"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StatCard
              icon={<PersonAddIcon fontSize="large" />}
              title="Add requests"
            />
          </Link>
        </Grid>
        <Grid item onClick={logout}>
          <StatCard icon={<LogoutIcon fontSize="large" />} title="Logout" />
          {/* </Link> */}
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.content}>
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
            to="/employeeannouncements"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <EnhancedCard title="Announcements">
              <AnnouncementList />
            </EnhancedCard>
          </Link>
        </Grid>
        <Grid item lg={3}>
          <EnhancedCard title="To Do List">
            <ToDo />
          </EnhancedCard>
        </Grid>
      </Grid>
    </div>
  );
};
export default EmployeePortalPage;
