import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import { CanvasJSChart } from "canvasjs-react-charts";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    height: "350px",
    // backgroundColor: "green",
  },
  columns: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "red",
  },
  title: {
    paddingBottom: 5,
  },
  number: {
    paddingTop: 15,
  },
  percentage: {
    paddingBottom: 15,
  },
});

export interface IEmployeeGenderStatCardProps {
  /**
   * the number to be displayed in the male female
   */
  male?: string;
  /**
   * the number to be displayed in the female column
   */
  female?: string;
}
/**
 * Statistics Card component for use in Dashboard page. Use a grid type container to wrap in.
 */

const EmployeeGenderStatCard = () => {
  const classes = useStyles();

  const [male, setMale] = useState(7);
  const [female, setFemale] = useState(10);

  const malepercent = "49.4";
  const femalepercent = "51.6";

  const getGender = async () => {
    console.log("GET Gender");
    try {
      const response = await axios.get(
        "http://localhost:5001/getEmployeeGender"
      );
      // console.log(response.data.ScannedCount);
      console.log("GEN RESP", response.data);
      setMale(response.data[0].Count);
      setFemale(response.data[1].Count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    getGender();
  };

  useEffect(() => {
    getGender();
    // console.log("Gender", male, female);
  }, [male, female]);

  const options = {
    // exportEnabled: true,
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 12,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: male, label: "Male", color: "blue" },
          { y: female, label: "Female", color: "pink" },
        ],
      },
    ],
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default EmployeeGenderStatCard;
