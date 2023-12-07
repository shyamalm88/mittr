import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Questionnaire from "./questionnaire.component";
import { v4 as uuidv4 } from "uuid";
import Tooltip from "@mui/material/Tooltip";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEditDataContext } from "../../hooks/useEditDataContext";

export default function AdditionalQuestions() {
  const { editableData } = useEditDataContext();
  const { register, setValue, unregister, control, getValues, reset } =
    useFormContext();
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalQuestions",
    });
  const addQuestionnaire = (data?: any) => {
    const temp = {
      id: uuidv4(),
      questionLabel: "Question",
      answerType: "",
      question: "",
    };
    if (data) {
      temp.id = data.id ? data.id : uuidv4();
      temp.questionLabel = data.questionLabel ? data.questionLabel : "Question";
      temp.answerType = data.answerType;
      temp.question = data.question;
    }

    append(temp);
  };

  React.useEffect(() => {
    if (editableData) {
      remove(0);
      editableData?.additionalQuestions?.forEach((element: any) => {
        addQuestionnaire(element);
      });
    }
  }, [editableData]);

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
            disabled={fields.length >= 7}
          >
            Add
            <Box
              sx={{ display: { xs: "none", lg: "flex", paddingLeft: "5px" } }}
            >
              questions
            </Box>
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}
