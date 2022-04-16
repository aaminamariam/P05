import React from "react";
import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DashCard from "../../components/DashCard";
import List from "@mui/material/List";
import DashCharts from "../../components/DashCharts";
import { Bar } from "react-chartjs-2";
import BarChart from "./EmployeeGraphs";
import { hslToRgb } from "@mui/material";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import { CanvasJSChart } from "canvasjs-react-charts";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 400,
      paddingBottom: 20,
      paddingTop: 60,
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
    },
    contentgraph: {},
  })
);

const EmployeesAnalytics = () => {
  //state variables
  const classes = useStyles();
  const [stats, setStats] = useState<any[]>([]);
  const [id, setId] = useState("22100270");
  const [tws, setTws] = useState([]);
  const [hrs, setHrs] = useState([]);
  const [rating, setRating] = useState([]);
  const [comments, setComments] = useState([]);
  const [postdate, setPostdate] = useState([]);
  const link = "http://localhost:5001/getstats/" + id;
  //    const avg = arr => {
  //    let total=0
  //    var array = arr.map(Number);
  //    for ( let i = 0; i < array.length; i++ ) {
  //      total += array[i];
  //    }
  //    return (total/array.length);
  //  }

  const getStats = async () => {
    try {
      const result = await axios.get(link);
      const data_points = result.data.Items;
      setStats(data_points);
      // console.log("DATAPOINTS", data_points);
      setHrs(data_points.map((item) => item.hoursworked));
      setTws(data_points.map((item) => item.teamworkScore));
      setRating(data_points.map((item) => item.rating));
      setComments(data_points.map((item) => item.comments));
      setPostdate(data_points.map((item) => item.postdate));
      console.log(
        new Date(2017, 1),
        stats.map((item) => ({
          x: item.postdate,
          y: item.hoursworked,
        }))
      );

      // setHrs(data_points.map((item) => console.log(item)));

      // for (var i = 0; i < data_points.length; i++) {
      //   // eslint-disable-next-line no-loop-func
      //   // setTws((tws) => [...tws, data_points[i].teamworkScore]);
      //   // eslint-disable-next-line no-loop-func
      //   setHrs(data_points[i].hoursworked);
      //   // setRating((rating) => [...rating, data_points[i].rating]);
      //   // setComments((comments) => [...comments, data_points[i].comments]);
      //   // setPostdate((postdate) => [...postdate, data_points[i].postdate]);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  // hoursworked
  //team score
  //const teamscore = data.teamworkScore;
  //console.log(teamscore);
  //setTws(average(teamscore.map((i: string) => Number(i))).toFixed(2));

  //const hoursworked = data.hoursworked;
  //console.log(hoursworked)
  // setHrs(average(hoursworked.map((i: string) => Number(i))).toFixed(2));
  //setComments(data.comments);

  // rating

  useEffect(() => {
    getStats();
    // console.log("hrs", hrs);
  }, []);
  //let hours=hrs.map((i) => Number(i));
  //console.log("hrs")
  //const avg_hrs=avg({hours})

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
      title: "",
      // prefix: "$",
    },
    data: [
      {
        yValueFormatString: "#.##",
        xValueFormatString: "MMMM",
        type: "line",
        dataPoints: stats.map((item) => ({
          // x: item.postdate[0],
          x: new Date(item.postdate.substr(0, 4), item.postdate.substr(5, 2)),
          y: parseInt(item.hoursworked),
        })),
      },
    ],
    theme: "light2",
    colorSet: "greenShades",
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginTop: "3rem" }}
      >
        <Grid item xl={3} lg={4} md={6} xs={12}>
          <DashCard
            cardTitle={"Recruitment Date"}
            cardIconBG={"rgba(210,239,243,255)"}
            cardDescription={"10th June '16"}
            cardIcon={<EmployeeIcon size="1.5em" color="#368292" />}
          />
        </Grid>
        <Grid item xl={3} lg={4} md={6} xs={12}>
          <DashCard
            cardTitle={"Vacation Days Used"}
            cardIconBG={"rgba(255,244,245,255)"}
            cardDescription={"8/10"}
            cardIcon={<EmployeeVacationsIcon size="1.5em" color="#bb5c5a" />}
          />
        </Grid>
        <Grid item xl={3} lg={4} md={6} xs={12}>
          <DashCard
            cardTitle={"Average hours worked"}
            cardIconBG={"rgba(254,248,230,255)"}
            cardDescription={""}
            cardIcon={<EmployeeSickIcon size="1.5em" color="#a79048" />}
          />
        </Grid>
        <Grid item xl={3} lg={4} md={6} xs={12}>
          <DashCard
            cardTitle={"Average Teamwork score"}
            cardIconBG={"rgba(240,250,245,255)"}
            cardDescription={tws}
            cardIcon={<EmployeeTasksIcon size="1.5em" color="#3f8a67" />}
          />
        </Grid>
      </Grid>
      <div>
        <Card className={classes.root} data-testid="card">
          <CardHeader
            title={
              //typography was used to override the default typography here because we cant target the header class or id and change fontSize or pass as props
              <Typography className={classes.title}>
                Worked Hours Summary
              </Typography>
            }
            data-testid="card-title"
          />
          <Divider className={classes.divider} />
          <CardContent className={classes.contentsub}></CardContent>

          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

const EmployeeIcon = (props: any) => {
  const { size = "1em", color = "black" } = props;

  return (
    <svg
      className="svg-icon"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={color}
        d="m620.8,521.38667a209.92,209.92 0 0 0 72,-158.72a213.33333,213.33333 0 0 0 -426.66666,0a209.92,209.92 0 0 0 74.66666,158.72a341.33333,341.33333 0 0 0 -200.53333,310.61333a42.66667,42.66667 0 0 0 85.33333,0a256,256 0 0 1 512,0a42.66667,42.66667 0 0 0 85.33334,0a341.33333,341.33333 0 0 0 -202.66667,-310.61333zm-140.8,-30.72a128,128 0 1 1 128,-128a128,128 0 0 1 -128,128z"
      />
    </svg>
  );
};

const EmployeeSickIcon = (props: any) => {
  const { size = "1em", color = "black" } = props;

  return (
    <svg
      className="svg-icon"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={color}
        d="M620.8 521.386667a209.92 209.92 0 0 0 72.533333-158.72 213.333333 213.333333 0 0 0-426.666666 0A209.92 209.92 0 0 0 341.333333 521.386667a341.333333 341.333333 0 0 0-200.533333 310.613333 42.666667 42.666667 0 0 0 85.333333 0 256 256 0 0 1 512 0 42.666667 42.666667 0 0 0 85.333334 0 341.333333 341.333333 0 0 0-202.666667-310.613333z m-140.8-30.72a128 128 0 1 1 128-128 128 128 0 0 1-128 128z m362.666667-213.333334a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333333 0v-85.333333a42.666667 42.666667 0 0 0-42.666666-42.666667zM810.666667 503.04a44.8 44.8 0 0 0-12.373334 30.293333 42.666667 42.666667 0 0 0 12.373334 30.293334 49.066667 49.066667 0 0 0 14.08 8.96 40.106667 40.106667 0 0 0 32.426666 0 38.4 38.4 0 0 0 23.04-23.04 35.84 35.84 0 0 0 3.413334-16.213334 42.666667 42.666667 0 0 0-72.96-30.293333z"
      />
    </svg>
  );
};

const EmployeeVacationsIcon = (props: any) => {
  const { size = "1em", color = "black" } = props;

  return (
    <svg
      className="svg-icon"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={color}
        d="M480 640l64 0C561.92 640 576 625.92 576 608S561.92 576 544 576l-64 0C462.08 576 448 590.08 448 608S462.08 640 480 640zM480 768l64 0C561.92 768 576 753.92 576 736 576 718.08 561.92 704 544 704l-64 0C462.08 704 448 718.08 448 736 448 753.92 462.08 768 480 768zM832 192l-128 0L704 160C704 142.08 689.92 128 672 128 654.08 128 640 142.08 640 160L640 192 384 192 384 160C384 142.08 369.92 128 352 128S320 142.08 320 160L320 192 192 192C121.6 192 64 249.6 64 320l0 512c0 70.4 57.6 128 128 128l640 0c70.4 0 128-57.6 128-128L960 320C960 249.6 902.4 192 832 192zM896 832c0 35.2-28.8 64-64 64L192 896c-35.2 0-64-28.8-64-64L128 448l768 0L896 832zM896 384 128 384 128 320c0-35.2 28.8-64 64-64l128 0 0 32C320 305.92 334.08 320 352 320S384 305.92 384 288L384 256l256 0 0 32C640 305.92 654.08 320 672 320 689.92 320 704 305.92 704 288L704 256l128 0c35.2 0 64 28.8 64 64L896 384zM288 768l64 0C369.92 768 384 753.92 384 736 384 718.08 369.92 704 352 704l-64 0C270.08 704 256 718.08 256 736 256 753.92 270.08 768 288 768zM672 640l64 0c17.92 0 32-14.08 32-32S753.92 576 736 576l-64 0C654.08 576 640 590.08 640 608S654.08 640 672 640zM288 640l64 0C369.92 640 384 625.92 384 608S369.92 576 352 576l-64 0C270.08 576 256 590.08 256 608S270.08 640 288 640zM672 768l64 0c17.92 0 32-14.08 32-32 0-17.92-14.08-32-32-32l-64 0c-17.92 0-32 14.08-32 32C640 753.92 654.08 768 672 768z"
      />
    </svg>
  );
};

const EmployeeTasksIcon = (props: any) => {
  const { size = "1em", color = "black" } = props;

  return (
    <svg
      className="svg-icon"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
    >
      <path
        fill={color}
        d="M840.454 62.442h-638.605c-76.445 0-139.409 63.68-139.409 141.007v614.048c0 77.326 62.963 141.007 139.408 141.007h638.605c76.454 0 139.408-63.68 139.408-141.007v-614.048c0-77.326-58.454-141.007-139.408-141.007zM912.409 822.050c0 40.931-31.473 72.772-71.954 72.772h-638.605c-40.473 0-71.954-31.84-71.954-72.772v-618.603c0-40.931 31.481-72.772 71.954-72.772h638.605c40.481 0 71.954 31.84 71.954 72.772v618.603zM399.73 285.32l-98.936 100.065-44.973-45.477c-13.5-13.647-35.981-13.647-44.973 0-13.5 13.638-13.5 36.386 0 45.477l71.954 72.781c4.5 4.546 13.492 9.092 26.981 9.092 13.5 0 13.5-4.546 26.981-9.092l121.426-122.813c13.5-13.647 13.5-36.386 0-45.487-26.981-13.638-44.973-13.638-58.463-4.546zM813.473 339.908h-310.308c-22.481 0-31.481 13.638-31.481 31.84 0 22.739 13.5 31.84 31.481 31.84h310.316c22.481 0 31.473-13.647 31.473-31.84 0-18.202-13.5-31.84-31.481-31.84zM318.775 544.584c-58.463 0-103.436 45.487-103.436 104.62 0 59.125 44.973 104.611 103.436 104.611 58.473 0 103.436-45.487 103.436-104.611 0-63.68-49.463-104.62-103.436-104.62zM318.775 681.043c-22.481 0-35.973-13.647-35.973-36.386 0-22.747 13.492-36.395 35.973-36.395 22.492 0 35.981 13.647 35.981 36.395 0 22.739-17.992 36.386-35.981 36.386zM813.473 612.808h-310.308c-22.481 0-31.481 13.647-31.481 31.849 0 18.184 13.5 31.84 31.481 31.84h310.316c22.481 0 31.473-13.647 31.473-31.84 0-18.202-13.5-31.84-31.481-31.84z"
      />
    </svg>
  );
};

export default EmployeesAnalytics;
