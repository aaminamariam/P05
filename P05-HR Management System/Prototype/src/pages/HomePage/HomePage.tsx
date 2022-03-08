import axios from "axios";
// import { itemsArray } from "./HomeItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createStyles, Grid, makeStyles } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonOffIcon from "@material-ui/icons/Home";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import AnnouncementsCard from "./AnnouncementsCard";
import EnhancedCard from "../../components/EnhancedCard";
import RequestList from "../EmployeeRequestsPage/RequestList";
import StatCard from "../../components/StatCard";
import EmployeeGenderCard from "./EmployeeGenderCard";
import ToDo from "../../components/ToDo/ToDo";
import EmployeeTurnoverCard from "./EmployeeTurnoverCard";
import EmployeeRetentionCard from "./EmployeeRetentionCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: "flex",
      // backgroundColor: "#FD6A00",
      // maxWidth: "1200px",
    },
    stats: {
      display: "flex",
      // backgroundColor: "#FD6A00",
      flexGrow: 1,
      // alignContent: "stretch",
      // alignItems: "stretch",
      // justifyContent: "stretch",
    },
    content: {
      // backgroundColor: "red",
      marginTop: "25px",
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const [job_openeings, setjob_openeings] = useState("0");

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/jobs/jobpostings/"
      );
      console.log(response.data.length);
      setjob_openeings(response.data.length.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.stats}>
        <Grid item lg={3}>
          <StatCard
            icon={<GroupIcon />}
            title="Number of Employees"
            data="678"
          />
        </Grid>
        <Grid item lg={3}>
          <StatCard
            icon={<PersonOffIcon />}
            title="Number on Leave"
            data="32"
          />
        </Grid>
        <Grid item lg={3}>
          <Link
            to="/hiringportal"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StatCard
              icon={<PersonAddIcon />}
              title="Job openings"
              data={job_openeings}
            />
          </Link>
        </Grid>
        <Grid item lg={3}>
          <StatCard
            icon={<MonetizationOnIcon />}
            title="Next payroll"
            data="25th August"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} className={classes.content}>
        <Grid item lg={3}>
          <Link
            to="/employeerequests"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <EnhancedCard title="Requests">
              <RequestList />
            </EnhancedCard>
          </Link>
        </Grid>
        <Grid item lg={3}>
          <EnhancedCard title="Announcements">
            <AnnouncementsCard />
          </EnhancedCard>
        </Grid>

        <Grid item lg={3}>
          <EnhancedCard title="To Do List">
            <ToDo />
          </EnhancedCard>
        </Grid>

        <Grid item lg={3}>
          <EnhancedCard title="Employee Gender">
            <EmployeeGenderCard />
          </EnhancedCard>
        </Grid>
        <Grid item lg={3}>
          <EnhancedCard title="Employee Turnover">
            <EmployeeTurnoverCard />
          </EnhancedCard>
        </Grid>

        <Grid item lg={3}>
          <EnhancedCard title="Employee Retention">
            <EmployeeRetentionCard />
          </EnhancedCard>
        </Grid>

        <Grid item lg={3}>
          <Link
            to="/empstats"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <StatCard
              icon={<GroupIcon />}
              title="Add Employee Statics"
              // backgroundColor= "#FD6A00"
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
export default HomePage;
