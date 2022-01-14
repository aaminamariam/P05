import axios from "axios";
// import { itemsArray } from "./HomeItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonOffIcon from "@material-ui/icons/Home";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import AnnouncementsCard from "../../components/AnnouncementsCard";
import EnhancedCard from "../../components/EnhancedCard";
import RequestList from "../../components/RequestList";
import StatCard from "../../components/StatCard";
import EmployeeGenderCard from "../../components/EmployeeGenderCard";
import ToDo from "../../components/ToDo/ToDo";
import EmployeeTurnoverCard from "../../components/EmployeeTurnoverCard";
import EmployeeRetentionCard from "../../components/EmployeeRetentionCard";
import EmpStatsForm from "../../components/empStatsForm";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // backgroundColor: "#FD6A00",
      // maxWidth: "1200px",
    },
    stats: {
      display: "flex",
    },
    content: {
      marginTop: "25px",
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [job_openeings, setjob_openeings] = useState("0");

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://52.91.138.50:8000/jobs/jobpostings/"
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
      <Grid container spacing={2} className={classes.stats}>
        <Grid item>
          <StatCard
            icon={<GroupIcon />}
            title="Number of Employees"
            data="678"
          />
        </Grid>
        <Grid item>
          <StatCard
            icon={<PersonOffIcon />}
            title="Number on Leave"
            data="32"
          />
        </Grid>
        <Grid item>
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
          <EnhancedCard title="Employee Gender">
            <EmployeeGenderCard />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Requests">
            <RequestList />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="To Do List">
            <ToDo />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Announcements">
            <AnnouncementsCard />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Employee Turnover">
            <EmployeeTurnoverCard />
          </EnhancedCard>
        </Grid>
        <Grid item>
          <EnhancedCard title="Employee Retention">
            <EmployeeRetentionCard />
          </EnhancedCard>
        </Grid>
        <Grid item>
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
export default Home;
