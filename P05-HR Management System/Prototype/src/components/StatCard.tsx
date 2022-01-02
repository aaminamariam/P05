import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    boxShadow: "box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)",
    width: "299px",
  },
  button: {
    paddingTop: 10,
    // paddingBottom: 5,
  },
  icon: {
    color: "rgba(0, 82, 204, 1)",
    fontSize: 60,
  },
  title: {
    color: "rgba(0, 82, 204, 1)",
    fontSize: 16,
    fontStyle: "Roboto",
    padding: 0,
  },
  data: {
    color: "black",
    paddingTop: 15,
    fontSize: 24,
  },
});

export interface IStatCardProps {
  /**
   * icon to be displayed in the card (must be a react component)
   */
  icon?: React.ReactElement;
  /**
   * title to be displayed in the card (must be a string)
   */
  title?: string;
  /**
   * the number to be displayed in the card component
   */
  data?: string;
}
/**
 * Statistics Card component for use in Dashboard page. Use a grid type container to wrap in.
 */

const StatCard: React.FC<IStatCardProps> = ({
  icon = <PermIdentityOutlinedIcon />,
  title = "Employees",
<<<<<<< HEAD
  data = "",
=======
  data = "0",
>>>>>>> develop
}: IStatCardProps) => {
  const classes = useStyles();

  function handleClick() {
    console.log("Card was clicked");
  }
  const iconStyled = React.cloneElement(icon, { className: classes.icon });
  return (
    <Card onClick={handleClick} className={classes.root}>
      <CardActionArea disableRipple={true} className={classes.button}>
        <CardContent>
          <div>{iconStyled}</div>
          <Typography variant="body2" component="p" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" className={classes.data}>
            {data}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default StatCard;
