import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import PollOptionWrapper from "./pollOptionWrapper.component";
import Stack from "@mui/material/Stack";
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
import { Card, CardContent, CardMedia } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AnswerSurveySectionsWrapper from "./answerSurveySectionsWrapper.component";
import { ComponentInputProps } from "../../types";
TimeAgo.addDefaultLocale(en);

const AnswerSurveyFormWrapper = ({
  segmentationStep,
  activeIndex,
}: ComponentInputProps) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const contextQuestionSetValue = usePollQuestionContext();
  const contextDurationValue = usePollQuestionContext("duration");

  const stepIndexValue = useStepWrapperContext();

  const handleDateDiff = useMemo(() => {
    let d1 = moment(moment().format("YYYY-MM-DD"));
    let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
    return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
  }, [contextDurationValue]);

  return (
    <>
      {segmentationStep?.title && (
        <Box
          sx={{
            width: "100%",
            mb: 3,
          }}
          className="customPaper"
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              boxShadow: "0px 0px 2px 0px #333333ab",
              borderRadius: "4px",
              borderTopColor: theme.palette.primary.dark,
              borderTopStyle: "solid",
              borderTopWidth: "2px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", py: "10px !important" }}>
                <Stack
                  direction={"column"}
                  alignContent={"space-between"}
                  spacing={2}
                  useFlexGap
                >
                  <Typography component="div" variant="h5">
                    {segmentationStep?.title}
                  </Typography>
                  <Typography component="div" variant="body2">
                    {segmentationStep?.description}
                  </Typography>
                  {activeIndex === 0 && (
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
                          alignItems: "center",
                          color: "rgb(156, 163, 175)",
                        }}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          <PermIdentityOutlinedIcon fontSize="small" />
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              fontSize: "1.2rem",
                              color: "inherit",
                            }}
                          >
                            Arghya Majumder
                          </Typography>
                        </Stack>
                        {contextDurationValue && (
                          <Tooltip
                            arrow
                            title={
                              <React.Fragment>
                                <Typography variant="body2" component="small">
                                  Poll started at{" "}
                                  {moment(
                                    contextQuestionSetValue.createdAt
                                  ).format("DD/MM/YYYY, hh:mm a")}
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
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap={1}
                                >
                                  <AccessTimeIcon fontSize="small" />
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
                  )}
                </Stack>
              </CardContent>
            </Box>
          </Card>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
        }}
      >
        {segmentationStep?.segments.map((item: any, index: number) => {
          return (
            <AnswerSurveySectionsWrapper
              key={item._id}
              index={index}
              item={item}
            />
          );
        })}
      </Box>
    </>
  );
};

export default AnswerSurveyFormWrapper;
