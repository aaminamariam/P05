import { makeStyles, createStyles } from "@material-ui/core";
import { classicNameResolver } from "typescript";

import StatCard from "../components/StatCard";

import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import EnhancedCard from "../components/EnhancedCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <StatCard
        icon={<PermIdentityOutlinedIcon />}
        title="Number of EMployees"
        data="678"
      />
      <StatCard
        icon={<PermIdentityOutlinedIcon />}
        title="Number on Leave"
        data="30"
      />
      <StatCard
        icon={<PermIdentityOutlinedIcon />}
        title="Profile Update Request"
      />
      <StatCard
        icon={<PermIdentityOutlinedIcon />}
        title="Next pay date"
        data="25th August"
      />
      <EnhancedCard title="Surveys">GRAOHS</EnhancedCard>
      <EnhancedCard title="TODO List">TODOLIST</EnhancedCard>
      <EnhancedCard title="EmployeeGender Ratio">RATIO</EnhancedCard>
      <EnhancedCard title="Employee Turnoover">DATA</EnhancedCard>
      <EnhancedCard title="Rwquests">Requests</EnhancedCard>
      <EnhancedCard title="Employee Retention">GRAOHS</EnhancedCard>
      <EnhancedCard title="Create Announcements">GRAOHS</EnhancedCard>
    </div>
  );
}
