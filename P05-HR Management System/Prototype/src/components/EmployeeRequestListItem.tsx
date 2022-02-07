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

const EmployeeListItem: React.FC<IEmployeeListItemProps> = ({
  title = "Title",
  type = "type",
  data = "Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat Aliquam eget maximus est, id dignissim quam.",
  id = "0",
}: IEmployeeListItemProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleApprove = async (x: any, id: any, type: any, data: any) => {
    await axios({
      method: "post",
      url: "http://52.91.138.50:5000/approverequests/",
      data: {
        employeeID: id,
        approval: x,
        description: data,
        option: type,
      },
    }).then((response: { data: any }) => {
      console.log(response.data);
      alert("success");
    });
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
          <Typography sx={{ width: "100%", flexShrink: 1 }}>{title}</Typography>
          <Typography sx={{ width: "100%", color: "text.secondary" }}>
            {type}
          </Typography>
          <Typography sx={{ width: "100%", color: "text.secondary" }}>
            {id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex" }}>
          <Typography sx={{ width: "100%" }}>{data}</Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={(e) => handleApprove("yes", id, type, data)}>
              Approve
            </Button>
            <Button onClick={(e) => handleApprove("no", id, type, data)}>
              Deny
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default EmployeeListItem;
