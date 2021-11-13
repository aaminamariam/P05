import { makeStyles, createStyles } from "@material-ui/core";

import StatCard from "../components/StatCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export default function Home() {
  // const classes = useStyles();
  return (
    <div>
      <StatCard />
    </div>
  );
}
