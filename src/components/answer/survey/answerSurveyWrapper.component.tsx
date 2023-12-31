import React from "react";
import Box from "@mui/material/Box";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import AnswerSurveyFormWrapper from "./answerSurveyFormWrapper.component";
import { usePollQuestionContext } from "../../../hooks/usePollQuestionContext";
import LinearProgress from "@mui/material/LinearProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactTimeAgo from "react-time-ago";
import NoProfileImage from "./../../../images/img/noProfileImage.png";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import Confetti from "react-confetti";
import { useMotionValue, motion } from "framer-motion";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Step,
  StepContent,
  Stepper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import he from "he";
import { useAuthenticatedUserData } from "../../../hooks/useAuthenticatedUserDataContext";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import {
  AnswerPollSubmittedValueType,
  AnswerSurveySubmittedValueType,
} from "../../../types";
import { checkValueAndValidityForSurvey } from "../../../utility/util";
import HttpService from "../../../services/@http/HttpClient";
import Subscribe from "../../subscribe/Subscribe";
import CheckmarkUtility from "../../../utility/checkMark";
import { useRouter } from "next/router";

const AnswerSurveyWrapper = () => {
  const theme = useTheme();
  const http = new HttpService();
  const contextValue = usePollQuestionContext();
  const router = useRouter();
  const { index, slug } = router.query;
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const targetRef = React.useRef();
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const [displaySubscribeOrSave, setDisplaySubscribeOrSave] =
    React.useState(false);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDisplaySubscribeOrSave(true);
      }, 4000);
    }
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleViewAnalytics = () => {
    handleClose();
    router.push("/viewAnalytics/" + index + "/" + slug);
  };

  const surveyInitial = {
    title: "", //contextValue.title,
    description: "", //contextValue.description,
    segments: [],
    actualIndex: 0,
  };
  let tempSegmentation: any[] = [surveyInitial];
  let counter = 0;
  contextValue.survey.forEach((element: any, index: number) => {
    if (element.type === "section") {
      if (index === 0) {
        tempSegmentation = [
          {
            title: element.title,
            description: element.description,
            segments: [],
            actualIndex: counter + 1,
          },
        ];
      } else {
        counter++;
        tempSegmentation = [
          ...tempSegmentation,
          {
            title: element.title,
            description: element.description,
            segments: [],
            actualIndex: counter,
          },
        ];
      }
    } else {
      tempSegmentation[counter].segments.push(element);
    }
  });

  const [surveySegmentation]: any[] = React.useState([...tempSegmentation]);

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(progress + 10);
  const contextDurationValue = usePollQuestionContext("duration");
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  React.useEffect(() => {
    setProgress((activeStep / surveySegmentation.length) * 100);
  }, [activeStep, surveySegmentation]);

  React.useEffect(() => {
    setBuffer(progress + 10);
  }, [progress]);

  const handleDateDiff = React.useMemo(() => {
    if (contextDurationValue) {
      let d1 = moment(moment().format("YYYY-MM-DD"));
      let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
      return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
    }
  }, [contextDurationValue]);

  const submitHandler = async (data: any) => {
    const surveySegmentsForActiveStep: any =
      getValues().survey[0]?.segments[activeStep];
    console.log(surveySegmentsForActiveStep);
    const isValid = checkValueAndValidityForSurvey(
      surveySegmentsForActiveStep,
      toast
    );
    if (isValid) {
      try {
        const resp = http.post("/participation", data);
        setDisplaySubscribeOrSave(true);
      } catch (err) {}
    }
  };

  const nextHandler = async () => {
    const surveySegmentsForActiveStep: any =
      getValues().survey[0]?.segments[activeStep];
    console.log(surveySegmentsForActiveStep);
    const isValid = checkValueAndValidityForSurvey(
      surveySegmentsForActiveStep,
      toast
    );
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const prevHandler = () => {
    setActiveStep((prev) => prev - 1);
  };

  const methods = useForm<AnswerSurveySubmittedValueType>({
    defaultValues: {
      selectedSurveyId: contextValue._id,
      survey: [
        {
          segments: [],
        },
      ],
      answeredByUserRef: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitSuccessful,
      isSubmitted,
    },
    control,
    getValues,
    setValue,
    clearErrors,
    register,
    setFocus,
    watch,
  } = methods;

  React.useEffect(() => {
    if (authenticatedUser) {
      setValue("answeredByUserRef", authenticatedUser.id);
    }
  }, [authenticatedUser, setValue]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box className="surveyStep">
            <Box
              sx={{
                width: "100%",
                mb: 3,
                pl: 1,
              }}
              className="customPaper"
            >
              <Card
                sx={{
                  borderTopColor: (theme: any) => theme.palette.primary.dark,
                  borderTopStyle: "solid",
                  borderTopWidth: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", lg: "row" },
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
                  borderRadius: "4px",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Stack
                      direction={"column"}
                      alignContent={"space-between"}
                      spacing={2}
                      useFlexGap
                    >
                      <Typography
                        variant="h1"
                        component="h1"
                        sx={{ fontSize: "2em", fontWeight: "bold" }}
                      >
                        {contextValue?.title}
                      </Typography>
                      <Typography
                        component="div"
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          __html: contextValue?.description
                            ? he.decode(contextValue?.description)
                            : "",
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
                            {contextValue?.createdByUserRef?.profileImgUrl ? (
                              <Avatar
                                alt={contextValue?.createdByUserRef?.fullName}
                                src={
                                  contextValue?.createdByUserRef?.profileImgUrl
                                }
                                sx={{ width: 24, height: 24 }}
                              />
                            ) : (
                              <Image
                                src={NoProfileImage}
                                alt={contextValue?.createdByUserRef?.fullName}
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
                              {authenticatedUser?.user?.fullName}
                            </Typography>
                          </Stack>
                          {contextDurationValue && (
                            <Tooltip
                              arrow
                              title={
                                <React.Fragment>
                                  {contextValue.createdAt && (
                                    <Typography
                                      variant="body2"
                                      component="small"
                                    >
                                      Poll started at{" "}
                                      {moment(contextValue.createdAt).format(
                                        "DD/MM/YYYY, hh:mm a"
                                      )}
                                      ,
                                    </Typography>
                                  )}

                                  <br />
                                  {contextDurationValue && (
                                    <Typography
                                      variant="body2"
                                      component="small"
                                    >
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
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Divider
              sx={{
                flexShrink: 0,
                opacity: 0.25,
                borderTop: "0px solid rgba(0, 0, 0, 0.12)",
                borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
                borderRight: "0px solid rgba(0, 0, 0, 0.12)",
                backgroundColor: "transparent",
                height: "0.0625rem",
                margin: "1rem 0px",
                borderBottom: "none",
                backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.3), rgba(52, 71, 103, 0)) !important`,
              }}
            />

            <Box sx={{ mb: 2, mt: 1, ml: 2 }}>
              <Typography
                component="p"
                variant="body2"
                sx={{ mt: 1 }}
                color="inherit"
              >
                <small>
                  Survey Completed {activeStep + 1} /{" "}
                  {surveySegmentation.length}
                </small>
              </Typography>
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
                aria-label="Survey Completion Progressbar"
              />
            </Box>

            <Stepper activeStep={activeStep} orientation="vertical">
              {surveySegmentation.map((step: any, index: number) => (
                <Step key={step.title}>
                  <StepContent
                    TransitionProps={{ unmountOnExit: false }}
                    sx={{ p: 0 }}
                  >
                    <AnswerSurveyFormWrapper
                      segmentationStep={step}
                      activeIndex={activeStep}
                      actualIndex={surveySegmentation[index].actualIndex}
                    />
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ m: 2, mb: 4, ml: 1, mr: 0, overflow: "hidden" }}>
              <Button
                onClick={prevHandler}
                color="inherit"
                startIcon={<NavigateBeforeOutlinedIcon />}
                variant="outlined"
                sx={{ float: "left" }}
                disabled={activeStep === 0}
              >
                Prev
              </Button>
              <Button
                color="primary"
                startIcon={<DoneOutlinedIcon />}
                variant="contained"
                sx={{ float: "right", ml: 1 }}
                disabled={activeStep !== surveySegmentation.length - 1}
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={nextHandler}
                color="primary"
                endIcon={<NavigateNextOutlinedIcon />}
                variant="contained"
                sx={{ float: "right" }}
                disabled={activeStep === surveySegmentation.length - 1}
              >
                Next
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        disableEscapeKeyDown
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          {displaySubscribeOrSave ? "Subscribe" : "Success"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <DialogContent>
          {displaySubscribeOrSave ? (
            <Subscribe />
          ) : (
            <Box sx={{ m: 2 }} ref={targetRef}>
              <Confetti width={900} height={445} recycle={true} />
              <Typography textAlign="center" sx={{ m: 3 }}>
                You have submitted the Answer
              </Typography>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 100 }}
                style={{ x: progress }}
                transition={{ duration: 1 }}
              />
              <CheckmarkUtility progress={progress} />
            </Box>
          )}
        </DialogContent>
        {displaySubscribeOrSave && (
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleClose}
              startIcon={<ArrowBackOutlinedIcon />}
            >
              Back To Home
            </Button>
            <Button
              variant="contained"
              onClick={handleViewAnalytics}
              startIcon={<BarChartOutlinedIcon />}
            >
              View Analytics
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default AnswerSurveyWrapper;
