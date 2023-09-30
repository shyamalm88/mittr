import React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import {
  FormControlLabel,
  Hidden,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";

function OptionChoose() {
  return (
    <>
      <Paper sx={{ width: 60 }}>
        <RadioGroup
          aria-labelledby="demo-form-control-label-placement"
          name="type"
          defaultValue="poll"
        >
          <MenuList
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MenuItem sx={{ p: 0 }}>
              <Tooltip title="Poll" placement="top">
                <FormControlLabel
                  value="multiple_choice"
                  className="radioImage"
                  sx={{ m: 0 }}
                  control={
                    <Radio
                      icon={<PollOutlinedIcon />}
                      checkedIcon={<PollOutlinedIcon />}
                    />
                  }
                  label="Poll"
                  labelPlacement="bottom"
                />
              </Tooltip>
            </MenuItem>
            <MenuItem sx={{ p: 0 }}>
              <Tooltip title="Survey" placement="top">
                <FormControlLabel
                  value="multiple_choice"
                  className="radioImage"
                  sx={{ m: 0 }}
                  control={
                    <Radio
                      icon={<BallotOutlinedIcon />}
                      checkedIcon={<BallotOutlinedIcon />}
                    />
                  }
                  label={<Hidden xlDown>Survey</Hidden>}
                  labelPlacement="bottom"
                />
              </Tooltip>
            </MenuItem>
          </MenuList>
        </RadioGroup>
      </Paper>
      <Paper sx={{ width: 60 }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Tooltip title="Add Section" placement="top">
                <AddCircleOutlineIcon />
              </Tooltip>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Tooltip title="Add Title Description" placement="top">
                <TextFieldsOutlinedIcon />
              </Tooltip>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Tooltip title="Duplicate Section" placement="top">
                <ContentCopy />
              </Tooltip>
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
}

export default OptionChoose;
