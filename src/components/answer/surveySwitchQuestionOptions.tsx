import { ComponentInputProps } from "../../types";
import dynamic from "next/dynamic";
const AddressInfoSurveySection = dynamic(
  () => import("./surveyTemplate/AddressSurveySection")
);
const CheckBoxChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/CheckboxChoiceSurveySection")
);
const CheckboxGridSurveySection = dynamic(
  () => import("./surveyTemplate/CheckboxGridSurveySection")
);
const ContactInfoSurveySection = dynamic(
  () => import("./surveyTemplate/ContactInfoSurveySection")
);
const DateChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/DateChoiceSurveySection")
);
const DropDownChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/DropDownChoiceSurveySection")
);
const EmailChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/EmailChoiceSurveySection")
);
const ImageMultipleChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/ImageMultipleChoiceSurveySection")
);
const LegalSurveySection = dynamic(
  () => import("./surveyTemplate/LegalSurveySection")
);
const LinearScaleChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/LinearScaleChoiceSurveySection")
);
const LongTextChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/LongTextChoiceSurveySection")
);
const MultipleChoiceGridSurveySection = dynamic(
  () => import("./surveyTemplate/MultipleChoiceGridSurveySection")
);
const MultipleChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/MultipleChoiceSurveySection")
);
const PhoneNumberSurveySection = dynamic(
  () => import("./surveyTemplate/PhoneNumberSurveySection")
);
const RangeSurveySection = dynamic(
  () => import("./surveyTemplate/RangeSurveySection")
);
const ShortTextChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/ShortTextChoiceSurveySection")
);
const StarRatingSurveySection = dynamic(
  () => import("./surveyTemplate/StarRatingSurveySection")
);
const TimeChoiceSurveySection = dynamic(
  () => import("./surveyTemplate/TimeChoiceSurveySection")
);

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
