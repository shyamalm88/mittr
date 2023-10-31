import { ComponentInputProps } from "../../types";
import CheckBoxChoiceSurveySection from "./surveyTemplate/ChecboxChoiceSurveySection";
import CheckboxGridSurveySection from "./surveyTemplate/CheckboxGridSurveySection";
import DateChoiceSurveySection from "./surveyTemplate/DateChoiceSurveySection";
import LinearScaleChoiceSurveySection from "./surveyTemplate/LinearScaleChoiceSurveySection";
import MultipleChoiceGridSurveySection from "./surveyTemplate/MultipleChoiceGridSurveySection";
import MultipleChoiceSurveySection from "./surveyTemplate/MultipleChoiceSurveySection";
import TimeChoiceSurveySection from "./surveyTemplate/TimeChoiceSurveySection";

function SurveySwitchQuestionOptions(props: ComponentInputProps) {
  switch (props.selectedValue.votingType) {
    case "multiple_choice":
      return <MultipleChoiceSurveySection {...props} />;
    case "check_box":
      return <CheckBoxChoiceSurveySection {...props} />;
    case "date":
      return <DateChoiceSurveySection {...props} />;
    case "time":
      return <TimeChoiceSurveySection {...props} />;
    case "linear_scale":
      return <LinearScaleChoiceSurveySection {...props} />;
    case "multiple_choice_grid":
      return <MultipleChoiceGridSurveySection {...props} />;
    case "checkbox_grid":
      return <CheckboxGridSurveySection {...props} />;

    default:
      return <></>;
  }
}

export default SurveySwitchQuestionOptions;
