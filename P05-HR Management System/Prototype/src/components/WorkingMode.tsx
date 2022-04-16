import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { CanvasJSChart } from "canvasjs-react-charts";
import axios from "axios";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);
export interface IWorkingModeCardProps {}
export default function WorkingModeCard(props: IWorkingModeCardProps) {
  const [remote, setRemote] = useState(10);
  const [onSite, setOnSite] = useState(10);
  const classes = useStyles();

  const getWorkingMode = async () => {
    // console.log("GET WORKIFNNF");
    try {
      const response = await axios.get("http://localhost:5001/getWorkingMode");
      // console.log(response.data.ScannedCount);
      setRemote(response.data[0].Count);
      setOnSite(response.data[1].Count);
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    // exportEnabled: true,
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: remote, label: "On site", color: "LightSeaGreen" },
          { y: onSite, label: "Remote", color: "RoyalBlue" },
        ],
      },
    ],
  };

  const handleClick = () => {
    getWorkingMode();
  };

  useEffect(() => {
    getWorkingMode();
    console.log("Working Mode ", remote, onSite);
  }, [remote, onSite]);

  return (
    <div className={classes.root} onClick={handleClick}>
      <CanvasJSChart options={options} />
    </div>
  );
}
