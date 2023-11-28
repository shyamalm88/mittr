import React from "react";
import Box from "@mui/material/Box";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import AnswerSurveyFormWrapper from "./answerSurveyFormWrapper.component";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import LinearProgress from "@mui/material/LinearProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import {
  Button,
  Card,
  CardContent,
  Divider,
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

const AnswerSurveyWrapper = () => {
  const theme = useTheme();
  const contextValue = usePollQuestionContext();
  const [activeStep, setActiveStep] = React.useState(0);

  const surveyInitial = {
    title: "", //contextValue.title,
    description: "", //contextValue.description,
    segments: [],
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
    let d1 = moment(moment().format("YYYY-MM-DD"));
    let d2 = moment(moment(contextDurationValue).format("YYYY-MM-DD"));
    return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
  }, [contextDurationValue]);

  return (
    <>
      <Box component="form" className="surveyStep">
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
                      __html: he.decode(contextValue?.description),
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
                                {moment(contextValue.createdAt).format(
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
              Survey Completed {activeStep + 1} / {surveySegmentation.length}
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
                />
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ m: 2, mb: 4, ml: 1, mr: 0, overflow: "hidden" }}>
          <Button
            onClick={() => setActiveStep(activeStep - 1)}
            color="inherit"
            startIcon={<NavigateBeforeOutlinedIcon />}
            variant="outlined"
            sx={{ float: "left" }}
          >
            Prev
          </Button>
          <Button
            onClick={() => setActiveStep(activeStep + 1)}
            color="primary"
            endIcon={<NavigateNextOutlinedIcon />}
            variant="contained"
            sx={{ float: "right" }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AnswerSurveyWrapper;
