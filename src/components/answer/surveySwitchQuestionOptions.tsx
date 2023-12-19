import { ComponentInputProps } from "../../types";
import dynamic from "next/dynamic";
const AddressInfoSurveySection = dynamic(
  () => import("./survey/surveyTemplate/AddressSurveySection")
);
const CheckBoxChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/CheckboxChoiceSurveySection")
);
const CheckboxGridSurveySection = dynamic(
  () => import("./survey/surveyTemplate/CheckboxGridSurveySection")
);
const ContactInfoSurveySection = dynamic(
  () => import("./survey/surveyTemplate/ContactInfoSurveySection")
);
const DateChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/DateChoiceSurveySection")
);
const DropDownChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/DropDownChoiceSurveySection")
);
const EmailChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/EmailChoiceSurveySection")
);
const ImageMultipleChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/ImageMultipleChoiceSurveySection")
);
const LegalSurveySection = dynamic(
  () => import("./survey/surveyTemplate/LegalSurveySection")
);
const LinearScaleChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/LinearScaleChoiceSurveySection")
);
const LongTextChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/LongTextChoiceSurveySection")
);
const MultipleChoiceGridSurveySection = dynamic(
  () => import("./survey/surveyTemplate/MultipleChoiceGridSurveySection")
);
const MultipleChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/MultipleChoiceSurveySection")
);
const PhoneNumberSurveySection = dynamic(
  () => import("./survey/surveyTemplate/PhoneNumberSurveySection")
);
const RangeSurveySection = dynamic(
  () => import("./survey/surveyTemplate/RangeSurveySection")
);
const ShortTextChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/ShortTextChoiceSurveySection")
);
const StarRatingSurveySection = dynamic(
  () => import("./survey/surveyTemplate/StarRatingSurveySection")
);
const TimeChoiceSurveySection = dynamic(
  () => import("./survey/surveyTemplate/TimeChoiceSurveySection")
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
