import React from "react";
import Box from "@mui/material/Box";

import { ComponentInputProps, OptionProp } from "../../types";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import QuestionnairePollAnswerTemplate from "./questionnairePollAnswerTemplate.component";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { useStepWrapperContext } from "../../hooks/useStepWrapperContext";

const QuestionnairePollAnswer = () => {
  const questionnaire = usePollQuestionContext("additionalQuestions");
  const stepIndexValue = useStepWrapperContext();

  return (
    <Box>
      <Stepper activeStep={stepIndexValue} orientation="vertical">
        {questionnaire?.map((item: OptionProp, index: number) => {
          const fieldName = `additionalQuestions[${index}]`;
          return (
            <Step key={index}>
              <StepLabel>{`Additional Question ${index + 1}`}</StepLabel>
              <StepContent>
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
