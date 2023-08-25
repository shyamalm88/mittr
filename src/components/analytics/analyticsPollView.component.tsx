import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";
import AnswerPollOptionAnalytics from "./answerPollOptionAnalytics.component";

const AnalyticsPollView = () => {
  const { question } = usePollAnalyticsContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
        }}
      >
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
            {question}
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
                }}
                className="typography"
              >
                Created By: Arghya Majumder
              </Typography>
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
          <AnswerPollOptionAnalytics />
        </Box>
      </Box>
    </>
  );
};

export default AnalyticsPollView;
