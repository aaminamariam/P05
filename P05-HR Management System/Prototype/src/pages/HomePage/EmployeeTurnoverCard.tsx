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
import { Button } from "@material-ui/core";
import { rgb } from "d3";

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
export interface IEmployeeTurnoverCardProps {}
export default function EmployeeTurnoverCard(
  props: IEmployeeTurnoverCardProps
) {
  const classes = useStyles();

  const [year, setyear] = React.useState(2017);

  const [turnoverRate, setturnoverRate] = useState({
    2017: [
      { x: new Date(year, 0), y: 2 },
      { x: new Date(year, 1), y: 2 },
      { x: new Date(year, 2), y: 4 },
      { x: new Date(year, 3), y: 3 },
      { x: new Date(year, 4), y: 1 },
      { x: new Date(year, 5), y: 1 },
      { x: new Date(year, 6), y: 4 },
      { x: new Date(year, 7), y: 5 },
      { x: new Date(year, 8), y: 3 },
      { x: new Date(year, 9), y: 4 },
      { x: new Date(year, 10), y: 3 },
      { x: new Date(year, 11), y: 3 },
    ],
    2018: [
      { x: new Date(year, 0), y: 1 },
      { x: new Date(year, 1), y: 1 },
      { x: new Date(year, 2), y: 3 },
      { x: new Date(year, 3), y: 2 },
      { x: new Date(year, 4), y: 5 },
      { x: new Date(year, 5), y: 3 },
      { x: new Date(year, 6), y: 2 },
      { x: new Date(year, 7), y: 3 },
      { x: new Date(year, 8), y: 1 },
      { x: new Date(year, 9), y: 2 },
      { x: new Date(year, 10), y: 3 },
      { x: new Date(year, 11), y: 1 },
    ],
    2019: [
      { x: new Date(year, 0), y: 3 },
      { x: new Date(year, 1), y: 3 },
      { x: new Date(year, 2), y: 2 },
      { x: new Date(year, 3), y: 5 },
      { x: new Date(year, 4), y: 2 },
      { x: new Date(year, 5), y: 1 },
      { x: new Date(year, 6), y: 4 },
      { x: new Date(year, 7), y: 3 },
      { x: new Date(year, 8), y: 1 },
      { x: new Date(year, 9), y: 1 },
      { x: new Date(year, 10), y: 1 },
      { x: new Date(year, 11), y: 3 },
    ],
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log("setting year to ", event.target.value);
    setyear(parseInt(event.target.value));
  };

  const options = {
    animationEnabled: true,
    // title: {
    //   text: "Monthly Sales - 2017",
    // },
    axisX: {
      valueFormatString: "MMM",
      // interval: 100,
    },
    axisY: {
      title: "Number of Employees Leaving",
      // prefix: "$",
    },
    data: [
      {
        yValueFormatString: "#.##",
        xValueFormatString: "MMMM",
        type: "area",
        dataPoints: turnoverRate[year],
      },
    ],
    theme: "light2",
    colorSet: "greenShades",
  };
  return (
    <div>
      <Card className={classes.root} data-testid="card">
        <CardHeader
          title={
            //typography was used to override the default typography here because we cant target the header class or id and change fontSize or pass as props
            <Typography className={classes.title}>Employee Turnover</Typography>
          }
          data-testid="card-title"
        />
        <Divider className={classes.divider} />
        <CardContent className={classes.contentsub}>
          <Typography variant="caption">
            Proportion of your workforce who leave during a period of time
          </Typography>
          <Box className={classes.select}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                className={classes.selectMenu}
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={year.toString()}
                label="Year"
                onChange={handleChange}
              >
                <MenuItem className={classes.selectMenuItem} value={2017}>
                  <Typography>2017</Typography>
                </MenuItem>
                <MenuItem className={classes.selectMenuItem} value={2018}>
                  <Typography>2018</Typography>
                </MenuItem>
                <MenuItem className={classes.selectMenuItem} value={2019}>
                  <Typography>2019</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>

        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </Card>
    </div>
  );
}
