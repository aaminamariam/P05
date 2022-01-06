import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minHeight: 300,
    // paddingHorizontal: 0,
    width: "280px",
  },
  title: {
    fontSize: 14.4,
    fontWeight: 600,
  },
  divider: {
    // width: "100%",
  },
  content: {
    padding: 0,
    paddingBottom: 0,
  },
});

export interface IEnhancedCardProps {
  /**
   * the content of the title
   */
  title: String;
  /**
   * content of the component, must be a node
   */
  children: React.ReactNode;
}

/**
 *  Customized component contains content and action about a single or multiple objects.
 *  Pass title and children as props
 */

const EnhancedCard = (props: IEnhancedCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testid="card">
      <CardHeader
        title={
          //typography was used to override the default typography here because we cant target the header class or id and change fontSize or pass as props
          <Typography className={classes.title}>{props.title}</Typography>
        }
        data-testid="card-title"
      />
      <Divider className={classes.divider} />
      <div className={classes.content}> {props.children}</div>
    </Card>
  );
};

export default EnhancedCard;
