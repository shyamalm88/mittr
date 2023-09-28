import React from "react";
import Box from "@mui/material/Box";

import { ComponentInputProps, OptionProp } from "../../types";
import QuestionnairePollAnswerTemplate from "./questionnairePollAnswerTemplate.component";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { useStepWrapperContext } from "../../hooks/useStepWrapperContext";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const QuestionnairePollAnswer = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  let questionnaire = usePollQuestionContext("additionalQuestions");
  const stepIndexValue = useStepWrapperContext();
  const [progress, setProgress] = React.useState(
    (stepIndexValue / questionnaire.length) * 100
  );
  const [buffer, setBuffer] = React.useState(progress + 10);

  React.useEffect(() => {
    setProgress((stepIndexValue / questionnaire.length) * 100);
    setBuffer(progress + 10);
  }, [stepIndexValue, questionnaire.length, progress]);

  return (
    <Box>
      <Box sx={{ mb: 2, mt: 1 }}>
        <Typography
          component="p"
          variant="body2"
          sx={{ mt: 1 }}
          color="inherit"
        >
          <small>
            Completed {stepIndexValue} / {questionnaire.length}
          </small>
        </Typography>
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
          aria-label="Answer Completion Progressbar"
        />
      </Box>
      <Stepper activeStep={stepIndexValue} orientation="vertical">
        {questionnaire?.map((item: OptionProp, index: number) => {
          const fieldName = `additionalQuestionsAnswers[${index}]`;
          return (
            <Step key={index}>
              <StepLabel>{`${item.question}`}</StepLabel>
              <StepContent
                TransitionProps={{ unmountOnExit: false }}
                sx={{ pl: { xs: 0, sm: 2 } }}
              >
                <React.Fragment key={index}>
                  <QuestionnairePollAnswerTemplate
                    questionItem={item}
                    index={index}
                    fieldName={fieldName}
                  />
                </React.Fragment>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default QuestionnairePollAnswer;
