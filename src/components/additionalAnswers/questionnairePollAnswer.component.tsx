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

const QuestionnairePollAnswer = () => {
  let questionnaire = usePollQuestionContext("additionalQuestions");
  const { captureCity, captureGender } = usePollQuestionContext("settings");
  if (captureCity) {
    questionnaire = [
      ...questionnaire,
      {
        answerType: "country",
        question: "Your residing Country and City",
        questionId: questionnaire.length + 1,
      },
    ];
  }
  if (captureGender) {
    questionnaire = [
      ...questionnaire,
      {
        answerType: "gender",
        question: "Please select your Gender",
        questionId: questionnaire.length + 1,
      },
    ];
  }
  const stepIndexValue = useStepWrapperContext();

  return (
    <Box>
      <Stepper activeStep={stepIndexValue} orientation="vertical">
        {questionnaire?.map((item: OptionProp, index: number) => {
          const fieldName = `additionalQuestions[${index}]`;
          return (
            <Step key={index}>
              <StepLabel>{`Additional Question ${index + 1}`}</StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
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
