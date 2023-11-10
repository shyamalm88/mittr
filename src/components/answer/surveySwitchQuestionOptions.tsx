import { ComponentInputProps } from "../../types";
import CheckBoxChoiceSurveySection from "./surveyTemplate/ChecboxChoiceSurveySection";
import CheckboxGridSurveySection from "./surveyTemplate/CheckboxGridSurveySection";
import DateChoiceSurveySection from "./surveyTemplate/DateChoiceSurveySection";
import ImageMultipleChoiceSurveySection from "./surveyTemplate/ImageMultipleChoiceSurveySection";
import LinearScaleChoiceSurveySection from "./surveyTemplate/LinearScaleChoiceSurveySection";
import MultipleChoiceGridSurveySection from "./surveyTemplate/MultipleChoiceGridSurveySection";
import MultipleChoiceSurveySection from "./surveyTemplate/MultipleChoiceSurveySection";
import RangeSurveySection from "./surveyTemplate/RangeSurveySection";
import StarRatingSurveySection from "./surveyTemplate/StarRatingSurveySection";
import TimeChoiceSurveySection from "./surveyTemplate/TimeChoiceSurveySection";
import VotingImageMultipleChoice from "./votingTemplate/votingImageMultipleChoice";

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
    case "star_rating":
      return <StarRatingSurveySection {...props} />;
    case "range":
      return <RangeSurveySection {...props} />;
    case "linear_scale":
      return <LinearScaleChoiceSurveySection {...props} />;
    case "multiple_choice_grid":
      return <MultipleChoiceGridSurveySection {...props} />;
    case "checkbox_grid":
      return <CheckboxGridSurveySection {...props} />;
    case "image_choice":
      return <ImageMultipleChoiceSurveySection {...props} />;

    default:
      return <></>;
  }
}

export default SurveySwitchQuestionOptions;
