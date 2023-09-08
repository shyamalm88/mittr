import React, { useMemo } from "react";
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
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

const AnswerPollFormWrapper = () => {
  const contextValue = usePollQuestionContext("question");
  const contextDurationValue = usePollQuestionContext("duration");

  const stepIndexValue = useStepWrapperContext();

  const handleDateDiff = useMemo(() => {
    let d1 = moment(moment().format("YYYY-MM-DD"));
    let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
    return d2.diff(d1, "days") < 0 ? "ended " : "will end ";
  }, [contextDurationValue]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
    >
      <>
        <Box
          sx={{
            width: "100%",
            px: 2,
            py: stepIndexValue === -1 ? 1 : 0,
            height: stepIndexValue === -1 ? "100%" : 0,
            overflow: stepIndexValue === -1 ? "visible" : "hidden",
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
              <Tooltip
                title={`${handleDateDiff} ${moment(contextDurationValue).format(
                  "MMM Do YY"
                )}`}
              >
                <Button
                  size="small"
                  sx={{ textTransform: "none" }}
                  startIcon={<AccessTimeIcon />}
                  color="inherit"
                >
                  <React.Fragment>
                    {/* {contextDurationValue &&
                      handleDateDiff +
                        moment(contextDurationValue, "YYYYMMDD").fromNow()} */}
                    <ReactTimeAgo date={contextDurationValue} />
                  </React.Fragment>
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            px: 2,
            py: stepIndexValue === -1 ? 1 : 0,
            height: stepIndexValue === -1 ? "100%" : 0,
            overflow: stepIndexValue === -1 ? "visible" : "hidden",
          }}
        >
          <AnswerPollOptionWrapper />
        </Box>
      </>

      <AdditionalAnswers stepIndexValue={stepIndexValue} />
    </Box>
  );
};

export default AnswerPollFormWrapper;
