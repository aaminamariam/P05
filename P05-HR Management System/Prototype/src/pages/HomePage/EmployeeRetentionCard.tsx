import React from "react";
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
export interface IEmployeeRetentionCardProps {}
export default function EmployeeRetentionCard(
  props: IEmployeeRetentionCardProps
) {
  const classes = useStyles();

  const [year, setyear] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setyear(event.target.value as string);
  };
  const options = {
    animationEnabled: true,
    // title: {
    //   text: "Monthly Sales - 2017",
    // },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      title: "Number of employees",
      // prefix: "$",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2017, 0), y: 100 },
          { x: new Date(2017, 1), y: 108 },
          { x: new Date(2017, 2), y: 101 },
          { x: new Date(2017, 3), y: 113 },
          { x: new Date(2017, 4), y: 131 },
          { x: new Date(2017, 5), y: 169 },
          { x: new Date(2017, 6), y: 127 },
          { x: new Date(2017, 7), y: 121 },
          { x: new Date(2017, 8), y: 115 },
          { x: new Date(2017, 9), y: 162 },
          { x: new Date(2017, 10), y: 122 },
          { x: new Date(2017, 11), y: 144 },
        ],
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
              Employee Retention
            </Typography>
          }
          data-testid="card-title"
        />
        <Divider className={classes.divider} />
        <CardContent className={classes.contentsub}>
          <Typography variant="caption">
            Proportion of your workforce who stay during a period of time
          </Typography>
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
        </CardContent>

        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </Card>
    </div>
  );
}
