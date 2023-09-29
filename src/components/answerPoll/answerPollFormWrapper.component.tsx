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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
TimeAgo.addDefaultLocale(en);

const AnswerPollFormWrapper = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const contextValue = usePollQuestionContext("question");
  const contextValueImage = usePollQuestionContext("questionImageRef");
  console.log(contextValueImage);
  const contextQuestionSetValue = usePollQuestionContext();
  const contextDurationValue = usePollQuestionContext("duration");

  const stepIndexValue = useStepWrapperContext();

  const handleDateDiff = useMemo(() => {
    let d1 = moment(moment().format("YYYY-MM-DD"));
    let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
    return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
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
          {contextValueImage && (
            <CardMedia
              component="img"
              loading="lazy"
              sx={{
                maxWidth: "100%",
                backgroundSize: "contain",
                maxHeight: "200px",
                backgroundPosition: "top",
              }}
              image={`${contextValueImage.destination.slice(1)}/${
                contextValueImage.filename
              }`}
              alt={contextValue}
            />
          )}
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stack
              direction={smallScreen ? "row" : "column"}
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
              {contextDurationValue && (
                <Tooltip
                  arrow
                  title={
                    <React.Fragment>
                      <Typography variant="body2" component="small">
                        Poll started at{" "}
                        {moment(contextQuestionSetValue.createdAt).format(
                          "DD/MM/YYYY, hh:mm a"
                        )}
                        ,
                      </Typography>
                      <br />
                      <Typography variant="body2" component="small">
                        {handleDateDiff}
                        {moment(contextDurationValue).format(
                          "DD/MM/YYYY, hh:mm a"
                        )}
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <Typography variant="body2" component="small">
                    <React.Fragment>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <AccessTimeIcon />
                        <ReactTimeAgo
                          date={Date.parse(contextDurationValue)}
                          tooltip={false}
                        />
                      </Stack>
                    </React.Fragment>
                  </Typography>
                </Tooltip>
              )}
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
