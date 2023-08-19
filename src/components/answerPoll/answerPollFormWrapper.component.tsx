import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import PollOptionWrapper from "./pollOptionWrapper.component";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import AnswerPollOptionWrapper from "./answerPollOptionWrapper.component";
import AdditionalAnswers from "../additionalAnswers/additionalAnswers.component";

const AnswerPollFormWrapper = () => {
  const contextValue = usePollQuestionContext("question");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fdfdfd",
          borderRadius: "4px 4px 0px 0px",
          px: 2,
          py: 1,
          border: "1px solid #e7e7e7",
        }}
      >
        <Typography
          variant="body1"
          component="h2"
          sx={{
            color: "#181818",
            fontFamily: "'Noto Serif', sans-serif",
            fontSize: "1.2rem",
          }}
        >
          {contextValue}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F3F3F3",
          border: "1px solid #e7e7e7",
          px: 2,
          py: 1,
        }}
      >
        <AnswerPollOptionWrapper />
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F6F6F6",
          border: "1px solid #E0E0E0",
          px: 2,
          py: 0.3,
          borderRadius: "0px 0px 4px 4px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6B6B6B",
          }}
        >
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<AccessTimeIcon />}
            color="inherit"
          >
            1w left
          </Button>
        </Stack>
      </Box>
      <AdditionalAnswers />
    </Box>
  );
};

export default AnswerPollFormWrapper;
