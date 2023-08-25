import React from "react";
import Box from "@mui/material/Box";

import { ComponentInputProps, OptionProp } from "../../types";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import QuestionnairePollAnswerTemplate from "./questionnairePollAnswerTemplate.component";

const QuestionnairePollAnswer = () => {
  const questionnaire = usePollQuestionContext("additionalQuestions");
  return (
    <Box>
      {questionnaire?.map((item: OptionProp, index: number) => {
        const fieldName = `additionalQuestions[${index}]`;
        return (
          <React.Fragment key={index}>
            <QuestionnairePollAnswerTemplate
              questionItem={item}
              index={index}
              fieldName={fieldName}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default QuestionnairePollAnswer;
