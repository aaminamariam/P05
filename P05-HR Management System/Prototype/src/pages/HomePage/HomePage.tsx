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
      // flexGrow: 1,
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
      display: "flex",
      flexGrow: 1,
      marginTop: "25px",
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const [jobOpeningsNumber, setjobOpeningsNumber] = useState("0");

  const [EmployeeNumber, setEmployeeNumber] = useState("0");

  const getJobOpeningsNumber = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/jobs/jobpostings/"
      );
      // console.log(response.data.length);
      setjobOpeningsNumber(response.data.ScannedCount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployeeNumber = async () => {
    try {
      const response = await axios.get("http://localhost:5001/ids/");
      // console.log(response.data.ScannedCount);
      setEmployeeNumber(response.data.ScannedCount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobOpeningsNumber();
    getEmployeeNumber();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.stats}>
        <Grid item lg={3}>
          <StatCard
            icon={<GroupIcon />}
            title="Number of Employees"
            data={EmployeeNumber}
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
              data={jobOpeningsNumber}
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
            <EnhancedCard title="New Requests">
              <RequestList />
            </EnhancedCard>
          </Link>
        </Grid>
        <Grid item lg={3}>
          <EnhancedCard title="New Announcements">
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
