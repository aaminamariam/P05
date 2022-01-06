import axios from "axios";
// import { itemsArray } from "./HomeItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonOffIcon from "@material-ui/icons/Home";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { CreatAnnouncement } from "../../components/CreateAnnouncement";
import EnhancedCard from "../../components/EnhancedCard";
import RequestList from "../../components/RequestList";
import StatCard from "../../components/StatCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
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
            title="Number of EMployees"
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
export default Home;
