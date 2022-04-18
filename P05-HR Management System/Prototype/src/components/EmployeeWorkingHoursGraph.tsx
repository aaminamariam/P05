import React from "react";
import {
    makeStyles,
    createStyles,
    Typography,
  
  } from "@material-ui/core";

import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { CanvasJSChart } from "canvasjs-react-charts";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 530,
      paddingBottom: 20,
      paddingTop: 60,
      width: "472px",
      display: "flex",
      flexDirection: "column",
    },

    title: {
      fontSize: 14,
      fontWeight: 600,
      color: "rgba(0, 82, 204, 1)",
    },
    contentsub: {
      display: "flex",
      padding: 0,
    },

  })
);

const EmployeeWorkingHoursGraph = () => {
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

const getStats = async () => {
    try {
      const result = await axios.get(link);
      const data_points = result.data.Items;
      setStats(data_points);
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
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
    getStats();
  }, []);
const options = {
    animationEnabled: true,
    
    axisX: {
      valueFormatString: "MMM",
     
    },
    axisY: {
      title: "Working Hours",
     
    },
    data: [
      {
        yValueFormatString: "#.##",
        xValueFormatString: "MMMM",
        type: "splineArea",
        showInLegend: true,
				legendText: "Months",
        dataPoints: stats.map((item) => ({

          x: new Date(item.postdate.substr(0, 4), item.postdate.substr(5, 2)),
          y: parseInt(item.hoursworked),
        })),
      },
    ],
    theme: "light2",
    colorSet: "greenShades",
  };
return (
<div>
        <Card className={classes.root} data-testid="card" >
          <CardHeader
            title={
              //typography was used to override the default typography here because we cant target the header class or id and change fontSize or pass as props
              <Typography className={classes.title}>
                Worked Hours Summary
              </Typography>
            }
            data-testid="card-title"
          />
         
         <CardContent className={classes.contentsub}>

              <CanvasJSChart
                 options={options}
 
              />
          </CardContent>

        </Card>
      </div>
        );
    };
    export default EmployeeWorkingHoursGraph;