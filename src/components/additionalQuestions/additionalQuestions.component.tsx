import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Questionnaire from "./questionnaire.component";
import { v4 as uuidv4 } from "uuid";
import Tooltip from "@mui/material/Tooltip";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function AdditionalQuestions() {
  const { register, setValue, unregister, control, getValues } =
    useFormContext();
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalQuestions",
    });
  const addQuestionnaire = () => {
    const temp = {
      id: uuidv4(),
      questionLabel: "Question",
      answerType: "",
    };
    append(temp);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        pt: 2,
      }}
    >
      <Questionnaire questionnaire={fields} remove={remove} update={update} />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "rgb(156, 163, 175)",
          marginRight: "135px",
          marginBottom: "30px",
        }}
      >
        <Tooltip title="Add Additional Questions" arrow placement="left">
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AddTaskIcon />}
            color="info"
            variant="outlined"
            onClick={addQuestionnaire}
            disabled={fields.length >= 5}
          >
            Add
            <Box
              sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
            >
              questions
            </Box>
          </Button>
        </Tooltip>
        <Box>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Reset Poll" arrow placement="left">
              <Button
                size="small"
                sx={{ textTransform: "none" }}
                startIcon={<RefreshOutlinedIcon />}
                color="inherit"
              >
                Reset
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex", paddingLeft: "5px" },
                  }}
                >
                  poll
                </Box>
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
