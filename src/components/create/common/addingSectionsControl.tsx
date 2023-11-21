import React from "react";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import { v4 as uuidv4 } from "uuid";
import { Portal } from "@mui/base";
import {
  Button,
  Divider,
  Hidden,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";

function AddingSectionsControl({
  fieldName,
  append,
  index,
  update,
  remove,
  swap,
  fields,
}: ComponentInputProps) {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const handleAddNewSurvey = async () => {
    const tempQuestion = {
      question: "",
      id: uuidv4(),
      votingType: "multiple_choice",
    };
    await append(tempQuestion);

    setQuestionType([...questionType, "multiple_choice"]);
  };

  const handleAddNewSection = async () => {
    const tempQuestion = {
      title: "Section Title",
      id: uuidv4(),
      description: "",
      type: "section",
    };
    await append(tempQuestion);
    setQuestionType([...questionType, ""]);
  };

  return (
    <>
      {pollOrSurvey == "survey" && index === 0 && (
        <>
          <Portal
            container={document.getElementById("surveyActionMenuPortalDesktop")}
          >
            <Paper
              sx={{
                width: { xs: "auto", lg: 60 },
              }}
            >
              <Hidden smDown>
                <MenuList>
                  <MenuItem onClick={handleAddNewSurvey} sx={{ px: 0 }}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ width: "100%" }}
                    >
                      <ListItemIcon sx={{ display: "contents" }}>
                        <Tooltip title="Add Survey Question" placement="top">
                          <AddCircleOutlineIcon />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="caption"
                          component="small"
                          sx={{
                            fontSize: "11px !important",
                            textWrap: "wrap",
                            display: "block",
                            textAlign: "center",
                            padding: "2px",
                            lineHeight: "13px",
                          }}
                        >
                          Add Question
                        </Typography>
                      </ListItemText>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleAddNewSection} sx={{ px: 0 }}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ width: "100%" }}
                    >
                      <ListItemIcon sx={{ display: "contents" }}>
                        <Tooltip title="Add Survey Question" placement="top">
                          <CalendarViewDayOutlinedIcon />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="caption"
                          component="small"
                          sx={{
                            fontSize: "11px !important",
                            textWrap: "wrap",
                            display: "block",
                            textAlign: "center",
                            padding: "2px",
                            lineHeight: "13px",
                          }}
                        >
                          Add Section
                        </Typography>
                      </ListItemText>
                    </Stack>
                  </MenuItem>
                </MenuList>
              </Hidden>
            </Paper>
          </Portal>
          <Portal
            container={document.getElementById("surveyActionMenuPortalMobile")}
          >
            <Paper
              sx={{
                width: { xs: "auto", lg: 60 },
              }}
            >
              <Hidden smUp>
                <Stack
                  direction="row"
                  useFlexGap
                  alignItems="stretch"
                  justifyContent="center"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Button
                    onClick={handleAddNewSurvey}
                    color="inherit"
                    sx={{
                      borderRadius: 0,
                      pb: 0,
                      pt: "11px",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction="column" alignItems="center">
                      <AddCircleOutlineIcon fontSize="small" sx={{ mb: 0.3 }} />
                      <Typography
                        variant="caption"
                        component="small"
                        sx={{
                          fontSize: "11px !important",
                          textTransform: "capitalize",
                        }}
                      >
                        Add Question
                      </Typography>
                    </Stack>
                  </Button>
                  <Button
                    onClick={handleAddNewSection}
                    color="inherit"
                    sx={{
                      borderRadius: 0,
                      pb: 0,
                      pt: "11px",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction="column" alignItems="center">
                      <CalendarViewDayOutlinedIcon
                        fontSize="small"
                        sx={{ mb: 0.3 }}
                      />
                      <Typography
                        variant="caption"
                        component="small"
                        sx={{
                          fontSize: "11px !important",
                          textTransform: "capitalize",
                        }}
                      >
                        Add Section
                      </Typography>
                    </Stack>
                  </Button>
                </Stack>
              </Hidden>
            </Paper>
          </Portal>
        </>
      )}
    </>
  );
}

export default AddingSectionsControl;
