import React from "react";
import Box from "@mui/material/Box";
import QuestionnairePollAnswer from "./questionnairePollAnswer.component";

export default function AdditionalAnswers() {
  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
      }}
    >
      <QuestionnairePollAnswer />
    </Box>
  );
}
