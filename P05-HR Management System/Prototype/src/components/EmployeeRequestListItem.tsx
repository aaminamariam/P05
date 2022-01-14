import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@material-ui/core";

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
}

const EmployeeListItem: React.FC<IEmployeeListItemProps> = ({
  title = "Title",
  type = "type",
  data = "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat Aliquam eget maximus est, id dignissim quam.",
}: IEmployeeListItemProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleApprove = () => {};

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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
          <Typography sx={{ color: "text.secondary" }}>{type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data}</Typography>
          <Button onClick={handleApprove}>Approve</Button>
          <Button onClick={handleApprove}>Deny</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default EmployeeListItem;
