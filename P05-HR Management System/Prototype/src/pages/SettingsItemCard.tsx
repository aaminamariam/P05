import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { blue, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";

// import {ITestProp} from '@websential/ws-react-ui/lib/components/ITestProps';

const useStyles = makeStyles({
  root: {
    borderColor: "white",
  },

  button: {
    display: "flex",
    justifyContent: "flex-start",
  },

  iconRoot: {
    paddingRight: 0,
    alignSelf: "flex-start",
  },

  icon: {
    padding: 11,
    paddingBottom: 8,
    borderRadius: 2,
    backgroundColor: grey[200],
  },
  textRoot: {
    alignSelf: "flex-start",
  },

  title: {
    fontWeight: 600,
    color: blue[700],
    fontSize: "0.9rem",
    lineHeight: "1.2",
  },

  description: {
    color: grey[500],
  },
});
//
export interface ISettingsItemCardProps {
  /**
   * Icon to be displayed in the card (must be a material UI icon component)
   */
  icon: React.ReactNode;
  /**
   * title to be diplayed in the card
   */
  title: string;
  /**
   * description to be displayed in the card
   */
  description: string;
  /**
   * link to be given to each button for navigation
   */
  navigateTo: string;
}

function handleClick() {
  console.log("Clicked");
}
/**
 * The API documentation of the Settings Items card component. This component is the surface that displays contents and actions
 * of each of the menu items in the Settings page only. Each card will be a button that will be an entry point to its respective page
 */
const SettingsItemCard: React.FC<ISettingsItemCardProps> = ({
  title = "title",
  icon = <InfoIcon color="action" />,
  description = "description",
  navigateTo = "/",
}: ISettingsItemCardProps) => {
  const classes = useStyles();

  return (
    <Link
      to={navigateTo}
      onClick={handleClick}
      style={{ textDecoration: "none" }}
    >
      <Card
        // data-testid={testId}
        className={classes.root}
        raised={false}
        variant="outlined"
      >
        <CardActionArea className={classes.button} disableRipple>
          <CardContent className={classes.iconRoot}>
            <div className={classes.icon}>{icon}</div>
          </CardContent>
          <CardContent className={classes.textRoot}>
            <Typography
              variant="subtitle2"
              component="p"
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              component="p"
              className={classes.description}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default SettingsItemCard;
