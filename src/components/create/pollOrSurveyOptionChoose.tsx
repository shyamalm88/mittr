import React from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import {
  Drawer,
  FormControlLabel,
  Hidden,
  IconButton,
  Portal,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
} from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";

function PollOrSurveyOptionChoose() {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();

  const handleChange = (e: any) => {
    setPollOrSurvey(e.target.value);
  };

  return (
    <>
      <Hidden smDown>
        <Paper sx={{ width: 60 }}>
          <RadioGroup
            aria-labelledby="demo-form-control-label-placement"
            name="type"
            value={pollOrSurvey}
            onChange={handleChange}
          >
            <MenuList
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MenuItem sx={{ px: 1 }}>
                <Tooltip title="Poll" placement="right">
                  <FormControlLabel
                    value="poll"
                    className="radioImage"
                    sx={{ m: 0 }}
                    control={
                      <Radio
                        icon={<PollOutlinedIcon />}
                        checkedIcon={<PollOutlinedIcon />}
                        sx={{ p: 0 }}
                      />
                    }
                    label="Poll"
                    labelPlacement="bottom"
                  />
                </Tooltip>
              </MenuItem>
              <MenuItem sx={{ p: 1 }}>
                <Tooltip title="Survey" placement="right">
                  <FormControlLabel
                    value="survey"
                    className="radioImage"
                    sx={{ m: 0 }}
                    control={
                      <Radio
                        icon={<BallotOutlinedIcon />}
                        checkedIcon={<BallotOutlinedIcon />}
                        sx={{ p: 0 }}
                      />
                    }
                    label="Survey"
                    labelPlacement="bottom"
                  />
                </Tooltip>
              </MenuItem>
            </MenuList>
          </RadioGroup>
        </Paper>

        <div id="surveyActionMenuPortal"></div>
      </Hidden>
      <Hidden smUp>
        <Portal>
          <Drawer open={true} anchor="bottom" variant="permanent">
            <Paper>
              <Stack
                direction={"row"}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <RadioGroup
                  aria-labelledby="demo-form-control-label-placement"
                  name="type"
                  defaultValue={pollOrSurvey}
                  onChange={handleChange}
                >
                  <MenuList
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                      p: 0,
                    }}
                  >
                    <MenuItem sx={{ p: 0 }}>
                      <Tooltip title="Poll" placement="right">
                        <FormControlLabel
                          value="poll"
                          className="radioImage"
                          sx={{ m: 0, P: 0 }}
                          control={
                            <Radio
                              icon={<PollOutlinedIcon />}
                              checkedIcon={<PollOutlinedIcon />}
                              sx={{ pb: 0 }}
                            />
                          }
                          label="Poll"
                          labelPlacement="bottom"
                        />
                      </Tooltip>
                    </MenuItem>
                    <MenuItem sx={{ p: 0 }}>
                      <Tooltip title="Survey" placement="right">
                        <FormControlLabel
                          value="survey"
                          className="radioImage"
                          sx={{ m: 0 }}
                          control={
                            <Radio
                              icon={<BallotOutlinedIcon />}
                              checkedIcon={<BallotOutlinedIcon />}
                              sx={{ pb: 0 }}
                            />
                          }
                          label="Survey"
                          labelPlacement="bottom"
                        />
                      </Tooltip>
                    </MenuItem>
                  </MenuList>
                </RadioGroup>
                <div id="surveyActionMenuPortal"></div>
              </Stack>
            </Paper>
          </Drawer>
        </Portal>
      </Hidden>
    </>
  );
}

export default PollOrSurveyOptionChoose;
