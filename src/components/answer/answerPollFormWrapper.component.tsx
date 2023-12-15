import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import he from "he";
import { useAuthenticatedUserData } from "../../hooks/useAuthenticatedUserDataContext";
import Image from "next/image";
import NoProfileImage from "./../../images/img/noProfileImage.png";
import { useFormContext } from "react-hook-form";
TimeAgo.addDefaultLocale(en);

const AnswerPollFormWrapper = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const contextValue = usePollQuestionContext("question");
  const contextValueQuestionId = usePollQuestionContext("_id");
  const contextValueImage = usePollQuestionContext("questionImageRef");
  const contextQuestionSetValue = usePollQuestionContext();
  const contextDurationValue = usePollQuestionContext("duration");
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const stepIndexValue = useStepWrapperContext();

  const handleDateDiff = useMemo(() => {
    if (contextDurationValue) {
      let d1 = moment(moment().format("YYYY-MM-DD"));
      let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
      return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
    }
  }, [contextDurationValue]);

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
    control,
  } = useFormContext();

  React.useEffect(() => {
    setValue(`selectedPrimaryQuestionId`, contextValueQuestionId);
  }, [contextValueQuestionId, setValue]);

  React.useEffect(() => {
    setValue(`answeredByUserRef`, authenticatedUser);
  }, [authenticatedUser, setValue]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}
    >
      <>
        <Box
          sx={{
            width: "100%",
            py: stepIndexValue === -1 ? 1 : 0,
            height: stepIndexValue === -1 ? "100%" : 0,
            overflow: stepIndexValue === -1 ? "visible" : "hidden",
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
                  <Typography
                    component="div"
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: he.decode(contextValue),
                    }}
                  ></Typography>

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
                        {contextQuestionSetValue?.createdByUserRef
                          ?.profileImgUrl ? (
                          <Avatar
                            alt={
                              contextQuestionSetValue?.createdByUserRef
                                ?.fullName
                            }
                            src={
                              contextQuestionSetValue?.createdByUserRef
                                ?.profileImgUrl
                            }
                            sx={{ width: 24, height: 24 }}
                          />
                        ) : (
                          <Image
                            src={NoProfileImage}
                            alt={
                              contextQuestionSetValue?.createdByUserRef
                                ?.fullName
                            }
                            width={24}
                            height={24}
                          />
                        )}

                        <Typography
                          variant="body2"
                          component="small"
                          sx={{
                            fontSize: "1.2rem",
                            color: "inherit",
                          }}
                        >
                          {contextQuestionSetValue?.createdByUserRef?.fullName}
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
                </Stack>
              </CardContent>
            </Box>
            {contextValueImage && (
              <CardMedia
                component="img"
                sx={{
                  maxWidth: { xs: "100%", lg: 251 },
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                }}
                image={`${contextValueImage.destination.slice(1)}/${
                  contextValueImage.filename
                }`}
              />
            )}
          </Card>
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
