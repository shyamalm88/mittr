import React from "react";
import Box from "@mui/material/Box";
import QuestionnaireTemplate from "./questionnaireTemplate.component";
import uniqid from "uniqid";
import { ComponentInputProps, OptionProp } from "../../types";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";

const Questionnaire = ({
  questionnaire,
  remove,
  update,
}: ComponentInputProps) => {
  const [typeOptions] = React.useState([
    {
      id: uniqid(),
      label: "Date",
      value: "date",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      id: uniqid(),
      label: "Range",
      value: "range",
      icon: <HdrStrongIcon />,
    },
    {
      id: uniqid(),
      label: "Multiple Choice",
      value: "choice",
      icon: <RadioButtonCheckedOutlinedIcon />,
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
              remove={remove}
              update={update}
              fieldName={fieldName}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Questionnaire;
