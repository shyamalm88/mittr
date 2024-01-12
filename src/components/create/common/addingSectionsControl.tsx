import React from "react";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import uniqid from "uniqid";
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
  useTheme,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";
import { useEditDataContext } from "../../../hooks/useEditDataContext";

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
  const theme = useTheme();

  const handleAddNewSurvey = async () => {
    const tempQuestion = {
      question: "",
      id: uniqid(),
      votingType: "multiple_choice",
    };
    await append(tempQuestion);

    setQuestionType([...questionType, "multiple_choice"]);
  };

  const handleAddNewSection = async () => {
    const tempQuestion = {
      title: "Section Title",
      id: uniqid(),
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
                // background: "#645cbb",
                // color: "#fff",
                boxShadow:
                  "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                // border: "1px solid #2540d9",
              }}
            >
              <Hidden lgDown>
                <MenuList>
                  <MenuItem onClick={handleAddNewSurvey} sx={{ px: 0 }} divider>
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
              <Hidden lgUp>
                <Stack
                  direction="row"
                  useFlexGap
                  alignItems="stretch"
                  justifyContent={{ xs: "left", lg: "center" }}
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
