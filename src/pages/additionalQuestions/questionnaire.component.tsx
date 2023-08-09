import React from "react";
import Box from "@mui/material/Box";
import QuestionnaireTemplate from "./questionnaireTemplate.component";
import { v4 as uuidv4 } from "uuid";
import { ComponentInputProps, OptionProp } from "../../types";

const Questionnaire = ({
  questionnaire,
  setQuestionnaire,
}: ComponentInputProps) => {
  const [typeOptions] = React.useState([
    { id: uuidv4(), label: "Date", value: "date" },
    { id: uuidv4(), label: "Date Range", value: "date_range" },
    { id: uuidv4(), label: "Range", value: "range" },
    { id: uuidv4(), label: "Choice", value: "radio" },
    {
      id: uuidv4(),
      label: "Country, State, City Combination",
      value: "country",
    },
  ]);

  return (
    <Box>
      {questionnaire?.map((item: OptionProp, index: number) => {
        const fieldName = `additionalQuestions[${index}]`;
        return (
          <React.Fragment key={item.id}>
            <QuestionnaireTemplate
              typeOptions={typeOptions}
              questionItem={item}
              index={index}
              questionnaire={questionnaire}
              setQuestionnaire={setQuestionnaire}
              fieldName={fieldName}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Questionnaire;
