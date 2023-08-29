import React from "react";
import Box from "@mui/material/Box";
import QuestionnaireTemplate from "./questionnaireTemplate.component";
import { v4 as uuidv4 } from "uuid";
import { ComponentInputProps, OptionProp } from "../../types";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import AppsIcon from "@mui/icons-material/Apps";
import ScheduleIcon from "@mui/icons-material/Schedule";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import PublicIcon from "@mui/icons-material/Public";
import HdrStrongIcon from "@mui/icons-material/HdrStrong";

const Questionnaire = ({
  questionnaire,
  setQuestionnaire,
}: ComponentInputProps) => {
  const [typeOptions] = React.useState([
    {
      id: uuidv4(),
      label: "Date",
      value: "date",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      id: uuidv4(),
      label: "Date Range",
      value: "date_range",
      icon: <DateRangeOutlinedIcon />,
    },
    {
      id: uuidv4(),
      label: "Range",
      value: "range",
      icon: <HdrStrongIcon />,
    },
    {
      id: uuidv4(),
      label: "Multiple Choice",
      value: "choice",
      icon: <RadioButtonCheckedOutlinedIcon />,
    },
    // {
    //   id: uuidv4(),
    //   label: "Checkbox",
    //   value: "checkbox",
    //   icon: <CheckBoxOutlinedIcon />,
    // },
    // {
    //   id: uuidv4(),
    //   label: "Linear Scale",
    //   value: "linear_scale",
    //   icon: <LinearScaleOutlinedIcon />,
    // },
    // {
    //   id: uuidv4(),
    //   label: "Multiple Choice Grid",
    //   value: "mcq_grid",
    //   icon: <AppsRoundedIcon />,
    // },
    // {
    //   id: uuidv4(),
    //   label: "Checkbox Grid",
    //   value: "checkbox_grid",
    //   icon: <AppsIcon />,
    // },
    // {
    //   id: uuidv4(),
    //   label: "Time",
    //   value: "time",
    //   icon: <ScheduleIcon />,
    // },
    // {
    //   id: uuidv4(),
    //   label: "Country, State, City Combination",
    //   value: "country",
    //   icon: <PublicIcon />,
    // },
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
