import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    height: "250px",
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

const EmployeeGenderStatCard: React.FC<IEmployeeGenderStatCardProps> = ({
  male = "45",
  female = "39",
}: IEmployeeGenderStatCardProps) => {
  const classes = useStyles();

  function handleClick() {
    console.log("Card was clicked");
  }

  //   const iconMan = React.cloneElement(<ManIcon />, {
  //     className: classes.iconMan,
  //   });
  //   const iconWoman = React.cloneElement(<WomanIcon />, {
  //     className: classes.iconWoman,
  //   });

  const malepercent = "49.4";
  const femalepercent = "51.6";

  return (
    <div onClick={handleClick} className={classes.root}>
      <div className={classes.columns}>
        <Typography variant="h6" className={classes.title}>
          Men
        </Typography>
        {/* {iconMan}
         */}
        <ManIcon
          sx={{
            maxHeight: 245,
            fontSize: 50,
            color: "lightblue",
          }}
        />
        <Typography variant="subtitle1" className={classes.number}>
          {male}
        </Typography>
        <Typography variant="caption" className={classes.percentage}>
          {malepercent}%
        </Typography>
      </div>
      <div className={classes.columns}>
        <Typography variant="h6" className={classes.title}>
          Women
        </Typography>
        {/* {iconWoman} */}
        <WomanIcon
          sx={{
            maxHeight: 245,
            fontSize: 50,
            color: "pink",
          }}
        />
        <Typography variant="subtitle1" className={classes.number}>
          {female}
        </Typography>
        <Typography variant="caption" className={classes.percentage}>
          {femalepercent}%
        </Typography>
      </div>
    </div>
  );
};

export default EmployeeGenderStatCard;
