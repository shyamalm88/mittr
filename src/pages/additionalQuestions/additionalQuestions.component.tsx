import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Questionnaire from "./questionnaire.component";
import { v4 as uuidv4 } from "uuid";

export default function AdditionalQuestions() {
  const [questionnaire, setQuestionnaire] = React.useState([
    { id: uuidv4(), questionLabel: "Question", answerType: "" },
  ]);

  const addQuestionnaire = () => {
    const temp = {
      id: uuidv4(),
      questionLabel: "Question",
      answerType: "",
    };
    setQuestionnaire([...questionnaire, temp]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        pt: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#949191",
        }}
      >
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          startIcon={<AddTaskIcon />}
          color="inherit"
          onClick={addQuestionnaire}
        >
          Add
          <Box sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}>
            additional questions
          </Box>
        </Button>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              startIcon={<PublicOutlinedIcon />}
              endIcon={<ExpandMoreIcon />}
              color="inherit"
            >
              Public
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Questionnaire
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#949191",
          marginRight: "135px",
          marginBottom: "30px",
        }}
      >
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          startIcon={<AddTaskIcon />}
          color="inherit"
          onClick={addQuestionnaire}
        >
          Add
          <Box sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}>
            additional questions
          </Box>
        </Button>
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              sx={{ textTransform: "none" }}
              startIcon={<RefreshOutlinedIcon />}
              color="inherit"
            >
              Reset
              <Box
                sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
              >
                poll
              </Box>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
