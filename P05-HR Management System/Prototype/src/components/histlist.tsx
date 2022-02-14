import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@material-ui/core";
import axios from "axios";

export interface IEmployeeListItemProps {
  /**
   * icon to be displayed in the card (must be a react component)
   */
  title: string;
  /**
   * title to be displayed in the card (must be a string)
   */
  type: string;
  /**
   * the number to be displayed in the card component
   */
  data: string;
  /**
   * the number to be displayed in the card component
   */
  approved?: string;
  /**
   * the number to be displayed in the card component
   */
  active?: string;

  id?: string;
}

const HistoryListItem: React.FC<IEmployeeListItemProps> = ({
  title = "Title",
  type = "type",
  data = "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat Aliquam eget maximus est, id dignissim quam.",
  active = "0",
}: IEmployeeListItemProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 1 }}>
            Name: {title}
          </Typography>
          <Typography sx={{ width: "100%", color: "text.secondary" }}>
            Option:{type}
          </Typography>

          <Typography sx={{ width: "100%", scolor: "text.secondary" }}>
            Status: {active}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ width: "100%" }}>Description: {data}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default HistoryListItem;
