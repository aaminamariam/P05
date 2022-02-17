import React from "react";
import { createStyles, makeStyles } from "@mui/styles";

import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: "flex",
    },
    body: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    select: {
      minWidth: "120px",
    },
    result: {},
  })
);
export interface IEmployeeTurnoeverCardProps {}
export default function EmployeeTurnoeverCard(
  props: IEmployeeTurnoeverCardProps
) {
  const classes = useStyles();

  const [year, setyear] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setyear(event.target.value as string);
  };
  return (
    <div className={classes.root}>
      <Typography variant="caption">
        Proportion of your workforce who leave during a period of time
      </Typography>
      <div className={classes.body}>
        <Box className={classes.select}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="year"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6">15%</Typography>
        <ThumbUpIcon fontSize="large" />
      </div>
    </div>
  );
}
