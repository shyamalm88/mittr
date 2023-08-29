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
import { useStepWrapperContext } from "../../hooks/useStepWrapperContext";

const AnswerPollFormWrapper = () => {
  const contextValue = usePollQuestionContext("question");
  const stepIndexValue = useStepWrapperContext();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
    >
      {stepIndexValue === -1 && (
        <>
          <Box
            sx={{
              width: "100%",
              px: 2,
              py: 1,
            }}
            className="customPaper"
          >
            <Typography
              variant="body1"
              component="h2"
              sx={{
                fontSize: "1.2rem",
              }}
              className="typography"
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
                    fontSize: "1.2rem",
                    color: "inherit",
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
              px: 2,
              py: 1,
            }}
          >
            <AnswerPollOptionWrapper />
          </Box>
        </>
      )}
      {stepIndexValue >= 0 && <AdditionalAnswers />}
    </Box>
  );
};

export default AnswerPollFormWrapper;
