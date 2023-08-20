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
          px: 2,
          py: 1,
        }}
      >
        <Typography
          variant="body1"
          component="h2"
          sx={{
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          {contextValue}
        </Typography>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "rgb(156, 163, 175)",
            }}
          >
            <Typography
              variant="body2"
              component="small"
              sx={{
                color: "inherit",
                fontSize: "1.2rem",
              }}
            >
              Created By: Arghya Majumder
            </Typography>
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
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          // border: "1px solid rgba(52, 71, 103, 0.9)",
          px: 2,
          py: 1,
        }}
      >
        <AnswerPollOptionWrapper />
      </Box>

      <AdditionalAnswers />
    </Box>
  );
};

export default AnswerPollFormWrapper;
