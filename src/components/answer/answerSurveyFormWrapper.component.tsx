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
import { Avatar, Card, CardContent, CardMedia } from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AnswerSurveySectionsWrapper from "./answerSurveySectionsWrapper.component";
import { ComponentInputProps } from "../../types";
import he from "he";
import { useAuthenticatedUserData } from "../../hooks/useAuthenticatedUserDataContext";

TimeAgo.addDefaultLocale(en);

const AnswerSurveyFormWrapper = ({
  segmentationStep,
  activeIndex,
  actualIndex,
}: ComponentInputProps) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const contextQuestionSetValue = usePollQuestionContext();
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const contextDurationValue = usePollQuestionContext("duration");

  const stepIndexValue = useStepWrapperContext();

  const handleDateDiff = useMemo(() => {
    if (contextDurationValue) {
      let d1 = moment(moment().format("YYYY-MM-DD"));
      let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
      return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
    }
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
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
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
                  <Typography
                    component="div"
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: segmentationStep?.description
                        ? he.decode(segmentationStep?.description)
                        : "",
                    }}
                  ></Typography>

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
                          <Avatar
                            alt={authenticatedUser?.user?.fullName}
                            src={authenticatedUser?.user?.profileImgUrl}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              fontSize: "1.2rem",
                              color: "inherit",
                            }}
                          >
                            {authenticatedUser?.user?.fullName}
                          </Typography>
                        </Stack>
                        {contextDurationValue && (
                          <Tooltip
                            arrow
                            title={
                              <React.Fragment>
                                {contextQuestionSetValue.createdAt && (
                                  <Typography variant="body2" component="small">
                                    Poll started at{" "}
                                    {moment(
                                      contextQuestionSetValue.createdAt
                                    ).format("DD/MM/YYYY, hh:mm a")}
                                    ,
                                  </Typography>
                                )}

                                <br />
                                {contextDurationValue && (
                                  <Typography variant="body2" component="small">
                                    {handleDateDiff}
                                    {moment(contextDurationValue).format(
                                      "DD/MM/YYYY, hh:mm a"
                                    )}
                                  </Typography>
                                )}
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
                                  {contextDurationValue && (
                                    <ReactTimeAgo
                                      date={Date.parse(contextDurationValue)}
                                      tooltip={false}
                                    />
                                  )}
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
              key={index}
              index={index}
              item={item}
              actualIndex={actualIndex}
            />
          );
        })}
      </Box>
    </>
  );
};

export default AnswerSurveyFormWrapper;
