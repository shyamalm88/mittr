import React from "react";
import Box from "@mui/material/Box";
import QuestionnairePollAnswer from "./questionnairePollAnswer.component";
import { ComponentInputProps } from "../../types";

export default function AdditionalAnswers({
  stepIndexValue,
}: ComponentInputProps) {
  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        height: stepIndexValue >= 0 ? "100%" : 0,
        overflow: stepIndexValue >= 0 ? "visible" : "hidden",
      }}
    >
      <QuestionnairePollAnswer />
    </Box>
  );
}
