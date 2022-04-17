import React, { useEffect, useState } from "react";
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
import { lightBlue } from "@mui/material/colors";
import { utcDays } from "d3";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 400,
      paddingBottom: 20,
      // width: "400px",
      display: "flex",
      flexDirection: "column",
    },

    title: {
      fontSize: 14,
      fontWeight: 600,
      color: "rgba(0, 82, 204, 1)",
    },
    select: {
      // minWidth: "100px",
      // height: "50px",
    },
    selectMenu: {
      minWidth: "100px",
      // minHeight: 200,
      display: "flex",
      // flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingLeft: 10,
      fontSize: 16,
      color: "primary",
    },
    selectMenuItem: {
      // minWidth: "120px",
      // minHeight: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      paddingTop: 4,
      paddingBottom: 3,
      fontSize: 16,
      color: "#2566c4",
    },

    divider: {
      width: "95%",
    },
    contentsub: {
      display: "flex",
      padding: 0,
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 8,
    },
    contentgraph: {},
  })
);
export interface IEmployeeHoursWorkedCardProps {}
export default function EmployeeHoursWorkedCard(
  props: IEmployeeHoursWorkedCardProps
) {
  const classes = useStyles();
  const [month, setMonth] = useState("January");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [hoursWorked, sethoursWorked] = useState({
    "january": [
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
    ],
  });

  const handleChange = (event: SelectChangeEvent) => {
    let val = event.target.value;
    setMonth(val);
  };

  useEffect(() => {
    // console.log("hw in", month, hoursWorked[month.toLowerCase()]);
  }, []);

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
          <Box className={classes.select}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="month"
                onChange={handleChange}
              >
                {months.map((m, i) => (
                  <MenuItem className={classes.selectMenuItem} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>

        <CanvasJSChart
          options={{
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
                dataPoints: hoursWorked[month.toLowerCase()].map((item) => ({
                  x: item.day,
                  y: item.hours,
                })),
              },
            ],
            theme: "light2",
            colorSet: "greenShades",
          }}
        />
      </Card>
    </div>
  );
}
