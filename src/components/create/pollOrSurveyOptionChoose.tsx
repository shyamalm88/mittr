import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PollIcon from "@mui/icons-material/Poll";
import BallotIcon from "@mui/icons-material/Ballot";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Sticky from "react-sticky-el";
import {
  Drawer,
  FormControlLabel,
  Hidden,
  Portal,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
} from "@mui/material";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { useQuestionTypeContext } from "../../hooks/useQuestionTypeContext";

function PollOrSurveyOptionChoose() {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const handleChange = (e: any) => {
    setPollOrSurvey(e.target.value);
    if (e.target.value === "poll") {
      setQuestionType("multiple_choice");
      document.title = "Mittr | Create Poll";
    } else {
      setQuestionType(["multiple_choice"]);
      document.title = "Mittr | Create Survey";
    }
  };

  return (
    <>
      <Paper sx={{ width: 60 }}>
        <RadioGroup name="type" value={pollOrSurvey} onChange={handleChange}>
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
                      checkedIcon={<PollIcon />}
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
                      checkedIcon={<BallotIcon />}
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
      <Sticky
        boundaryElement=".MuiBox-root"
        hideOnBoundaryHit={false}
        stickyStyle={{
          marginLeft: "-30px",
          marginTop: "60px",
        }}
      >
        <div id="surveyActionMenuPortalDesktop" style={{ width: "60px" }} />
      </Sticky>

      <Portal>
        <Drawer
          open={true}
          anchor="bottom"
          variant="permanent"
          sx={{
            background: "red",
            height: { xs: "auto", sm: 0 },
            visibility: { xs: "visible", sm: "hidden" },
          }}
        >
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
                            checkedIcon={<PollIcon />}
                            sx={{ pb: 0 }}
                          />
                        }
                        label="Poll"
                        labelPlacement="bottom"
                      />
                    </Tooltip>
                  </MenuItem>
                  <MenuItem sx={{ p: 0, px: { xs: 1, lg: 0 } }}>
                    <Tooltip title="Survey" placement="right">
                      <FormControlLabel
                        value="survey"
                        className="radioImage"
                        sx={{ m: 0 }}
                        control={
                          <Radio
                            icon={<BallotOutlinedIcon />}
                            checkedIcon={<BallotIcon />}
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
              <div id="surveyActionMenuPortalMobile"></div>
            </Stack>
          </Paper>
        </Drawer>
      </Portal>
    </>
  );
}

export default PollOrSurveyOptionChoose;
