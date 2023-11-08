import React from "react";
import Box from "@mui/material/Box";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import AnswerSurveyFormWrapper from "./answerSurveyFormWrapper.component";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Button,
  Card,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const AnswerSurveyWrapper = () => {
  const contextValue = usePollQuestionContext();
  const [activeStep, setActiveStep] = React.useState(0);

  const surveyInitial = {
    title: contextValue.title,
    description: contextValue.description,
    segments: [],
  };
  let tempSegmentation: any[] = [surveyInitial];
  let counter = 0;
  contextValue.survey.forEach((element: any) => {
    if (element.type === "section") {
      counter++;
      tempSegmentation = [
        ...tempSegmentation,
        {
          title: element.title,
          description: element.description,
          segments: [],
        },
      ];
    } else {
      tempSegmentation[counter].segments.push(element);
    }
  });

  const [surveySegmentation]: any[] = React.useState([...tempSegmentation]);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(progress + 10);

  React.useEffect(() => {
    setProgress((activeStep / surveySegmentation.length) * 100);
  }, [activeStep, surveySegmentation]);

  React.useEffect(() => {
    setBuffer(progress + 10);
  }, [progress]);

  return (
    <>
      <Box component="form" className="surveyStep">
        <Box sx={{ mb: 2, mt: 1, ml: 2 }}>
          <Typography
            component="p"
            variant="body2"
            sx={{ mt: 1 }}
            color="inherit"
          >
            <small>
              Survey Completed {activeStep} / {surveySegmentation.length}
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
