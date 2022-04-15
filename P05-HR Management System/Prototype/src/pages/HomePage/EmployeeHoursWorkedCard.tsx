import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { CanvasJSChart } from "canvasjs-react-charts";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 400,
      paddingBottom: 20,
      width: "572px",
      display: "flex",
      flexDirection: "column",
    },

    title: {
      fontSize: 14,
      fontWeight: 600,
      color: "rgba(0, 82, 204, 1)",
    },
    select: {
      minWidth: "100px",
    },

    divider: {
      width: "95%",
    },
    contentsub: {
      display: "flex",
      padding: 0,
      // paddingBottom: 8,
    },
    contentgraph: {},
  })
);
export interface IEmployeeHoursWorkedCardProps {}
export default function EmployeeHoursWorkedCard(
  props: IEmployeeHoursWorkedCardProps
) {
  const classes = useStyles();

  const [hoursWorked, sethoursWorked] = useState([
    { day: 0, hours: 7 },
    { day: 2, hours: 5 },
    { day: 3, hours: 4 },
    { day: 4, hours: 6 },
    { day: 5, hours: 7 },
    { day: 6, hours: 8 },
    { day: 7, hours: 6 },
    { day: 8, hours: 5 },
    { day: 9, hours: 4 },
    { day: 10, hours: 6 },
    { day: 11, hours: 6 },
    { day: 12, hours: 7 },
    { day: 13, hours: 5 },
    { day: 14, hours: 4 },
    { day: 15, hours: 6 },
    { day: 16, hours: 7 },
    { day: 17, hours: 5 },
    { day: 18, hours: 4 },
    { day: 19, hours: 5 },
    { day: 20, hours: 6 },
    { day: 21, hours: 7 },
    { day: 22, hours: 6 },
    { day: 23, hours: 5 },
    { day: 24, hours: 4 },
    { day: 25, hours: 5 },
    { day: 26, hours: 5 },
    { day: 27, hours: 6 },
    { day: 28, hours: 7 },
    { day: 29, hours: 6 },
    { day: 30, hours: 5 },
    { day: 31, hours: 4 },
  ]);

  const [year, setyear] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setyear(event.target.value as string);
  };

  const dp = hoursWorked.map(({ day, hours }) => ({ x: day, y: hours }));

  const options = {
    animationEnabled: true,
    axisX: {
      valueFormatString: "#",
      interval: 1,
      title: "Date",
    },
    axisY: {
      title: "Number of Hours",
      // prefix: "$",
    },
    data: [
      {
        yValueFormatString: "## Hours",
        xValueFormatString: "Date: #th",
        type: "spline",

        // dataPoints: [
        //   { x: new Date(2017, 0, 0), y: 100 },
        //   { x: new Date(2017, 1), y: 108 },
        //   { x: new Date(2017, 2), y: 101 },
        //   { x: new Date(2017, 3), y: 113 },
        //   { x: new Date(2017, 4), y: 131 },
        //   { x: new Date(2017, 5), y: 169 },
        //   { x: new Date(2017, 6), y: 127 },
        //   { x: new Date(2017, 7), y: 121 },
        //   { x: new Date(2017, 8), y: 115 },
        //   { x: new Date(2017, 9), y: 162 },
        //   { x: new Date(2017, 10), y: 122 },
        //   { x: new Date(2017, 11), y: 144 },
        // ],
        dataPoints: dp,
      },
    ],
  };
  return (
    <div>
      <Card className={classes.root} data-testid="card">
        <CardHeader
          title={
            //typography was used to override the default typography here because we cant target the header class or id and change fontSize or pass as props
            <Typography className={classes.title}>
              Employee Hours Worked
            </Typography>
          }
          data-testid="card-title"
        />
        <Divider className={classes.divider} />
        <CardContent className={classes.contentsub}>
          <Typography variant="caption">
            Average daily hours worked in the current month
          </Typography>
          {/* <Box className={classes.select}>
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
          </Box> */}
        </CardContent>

        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </Card>
    </div>
  );
}
