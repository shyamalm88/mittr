import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import { Divider } from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { v4 as uuidv4 } from "uuid";

const alternateOptionsList = [
  {
    id: uuidv4(),
    label: "Preview",
    displayFor: "all",
    icon: <RemoveRedEyeOutlinedIcon fontSize="small" />,
  },
  {
    id: uuidv4(),
    label: "Logic",
    displayFor: "Survey",
    icon: <RouteOutlinedIcon fontSize="small" />,
  },
  {
    id: uuidv4(),
    label: "Template",
    displayFor: "Survey",
    icon: <ViewComfyOutlinedIcon fontSize="small" />,
  },
  {
    id: uuidv4(),
    label: "Design",
    displayFor: "Survey",
    icon: <BrushOutlinedIcon fontSize="small" />,
  },
  {
    id: uuidv4(),
    label: "Query Vault",
    displayFor: "Survey",
    icon: <Inventory2OutlinedIcon fontSize="small" />,
  },
];

function AlternativeActions() {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const [alternateActionsOptions, setAlternateActionsOptions] =
    React.useState<any>([]);

  React.useEffect(() => {
    // // console.log(pollOrSurvey);
    if (pollOrSurvey === "poll") {
      setAlternateActionsOptions(
        alternateOptionsList.filter((x) => x.displayFor == "all")
      );
    } else {
      setAlternateActionsOptions(alternateOptionsList);
    }
  }, [pollOrSurvey]);

  React.useEffect(() => {
    // // console.log(alternateActionsOptions);
  }, [alternateActionsOptions]);

  return (
    <MenuList>
      {alternateActionsOptions.map((item: any) => {
        return (
          <MenuItem sx={{ pl: 1 }} key={item.id}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: ".85em" }}>{item.label}</Typography>
            </ListItemText>
          </MenuItem>
        );
      })}
    </MenuList>
  );
}

export default AlternativeActions;
