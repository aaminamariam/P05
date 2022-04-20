import axios from "axios";
// import { itemsArray } from "./HomeItems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createStyles, Grid, makeStyles } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonOffIcon from "@material-ui/icons/Home";
import ArchiveIcon from "@material-ui/icons/Archive";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useGlobalContext } from "../../components/GlobalContext";
import AnnouncementsCard from "./AnnouncementsCard";
import EnhancedCard from "../../components/EnhancedCard";
import RequestList from "../EmployeeRequestsPage/RequestList";
import StatCard from "../../components/StatCard";
import EmployeeGenderCard from "./EmployeeGenderCard";
import ToDo from "../../components/ToDo/ToDo";
import EmployeeTurnoverCard from "./EmployeeTurnoverCard";
import EmployeeRetentionCard from "./EmployeeRetentionCard";
import EmployeeHoursWorkedCard from "./EmployeeHoursWorkedCard";
import WorkingMode from "../../components/WorkingMode";

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
      display: "flex",
      marginTop: "25px",
      flexGrow: 1,
    },
    content2: {
      display: "flex",
      marginTop: "25px",
      columnWidth: 500,
      flexGrow: 2,
    },
  })
);
export function getJwtToken() {
  const token = sessionStorage.getItem("jwt");
  const name: string = token as string;
  return name;
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const HomePage = () => {
  const classes = useStyles();
  const [jobOpeningsNumber, setjobOpeningsNumber] = useState("0");
  const [jobapplications, setJobApplications] = useState("0");
  const { loggedIn, setLoggedIn } = useGlobalContext();
  const [EmployeeNumber, setEmployeeNumber] = useState("0");

  const getJobOpeningsNumber = async () => {
    try {
      const response = await axios.get("http://localhost:8000/jobcount/", {
        headers: { "access-token": getJwtToken() },
      });
      // console.log(response.data.length);
      setjobOpeningsNumber(response.data.ScannedCount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const setJwtToken = (token) => {
    sessionStorage.setItem("jwt", token);
  };
  const getEmployeeNumber = async () => {
    try {
      const response = await axios.get("http://localhost:5001/employeecount", {
        headers: { "access-token": getJwtToken() },
      });
      // console.log(response.data.ScannedCount);
      setEmployeeNumber(response.data.ScannedCount.toString());
    } catch (error) {
      console.error(error);
    }
  };
  const getcvcount = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cvcount", {
        headers: { "access-token": getJwtToken() },
      });
      console.log(response.data.ScannedCount);
      setJobApplications(response.data.ScannedCount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobOpeningsNumber();
    getEmployeeNumber();
    getcvcount();
  }, []);

  return (
    <div className={classes.root}>
      <p>{loggedIn}</p>
      <Grid container spacing={1} className={classes.stats}>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <StatCard
            icon={<GroupIcon />}
            title="Number of Employees"
            data={EmployeeNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <StatCard
            icon={<PersonOffIcon />}
            title="Employees on Leave"
            data="32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
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
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <StatCard
            icon={<ArchiveIcon />}
            title="Number of Job Applications"
            data={jobapplications}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.content}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Link
            to="/employeerequests"
            style={{ textDecoration: "none", textDecorationColor: "white" }}
          >
            <EnhancedCard title="New Requests">
              <RequestList />
            </EnhancedCard>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <EnhancedCard title="New Announcements">
            <AnnouncementsCard />
          </EnhancedCard>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <EnhancedCard title="To Do List">
            <ToDo />
          </EnhancedCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <EnhancedCard title="Employee Gender">
            <EmployeeGenderCard />
          </EnhancedCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <EnhancedCard title="Working Mode">
            <WorkingMode />
          </EnhancedCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <EmployeeHoursWorkedCard />
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.content2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <EmployeeTurnoverCard />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <EmployeeRetentionCard />
        </Grid>
      </Grid>
    </div>
  );
};
export default HomePage;
