import { ComponentInputProps } from "../../types";
import AddressInfoSurveySection from "./surveyTemplate/AddressSurveySection";
import CheckBoxChoiceSurveySection from "./surveyTemplate/ChecboxChoiceSurveySection";
import CheckboxGridSurveySection from "./surveyTemplate/CheckboxGridSurveySection";
import ContactInfoSurveySection from "./surveyTemplate/ContactInfoSurveySection";
import DateChoiceSurveySection from "./surveyTemplate/DateChoiceSurveySection";
import DropDownChoiceSurveySection from "./surveyTemplate/DropDownChoiceSurveySection";
import EmailChoiceSurveySection from "./surveyTemplate/EmailChoiceSurveySection";
import ImageMultipleChoiceSurveySection from "./surveyTemplate/ImageMultipleChoiceSurveySection";
import LegalSurveySection from "./surveyTemplate/LegalSurveySection";
import LinearScaleChoiceSurveySection from "./surveyTemplate/LinearScaleChoiceSurveySection";
import LongTextChoiceSurveySection from "./surveyTemplate/LongTextChoiceSurveySection";
import MultipleChoiceGridSurveySection from "./surveyTemplate/MultipleChoiceGridSurveySection";
import MultipleChoiceSurveySection from "./surveyTemplate/MultipleChoiceSurveySection";
import PhoneNumberSurveySection from "./surveyTemplate/PhoneNumberSurveySection";
import RangeSurveySection from "./surveyTemplate/RangeSurveySection";
import ShortTextChoiceSurveySection from "./surveyTemplate/ShortTextChoiceSurveySection";
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
    case "email":
      return <EmailChoiceSurveySection {...props} />;
    case "phone_number":
      return <PhoneNumberSurveySection {...props} />;
    case "address":
      return <AddressInfoSurveySection {...props} />;
    case "dropdown":
      return <DropDownChoiceSurveySection {...props} />;
    case "short_text":
      return <ShortTextChoiceSurveySection {...props} />;
    case "long_text":
      return <LongTextChoiceSurveySection {...props} />;
    case "legal":
      return <LegalSurveySection {...props} />;
    case "contact_info":
      return <ContactInfoSurveySection {...props} />;
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
