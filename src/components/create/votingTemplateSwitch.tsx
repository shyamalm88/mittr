import { ComponentInputProps } from "../../types";
import dynamic from "next/dynamic";
const MultipleChoice = dynamic(() => import("./votingTemplate/multipleChoice"));
const ImageChoice = dynamic(() => import("./votingTemplate/imageChoice"));
const Checkbox = dynamic(() => import("./votingTemplate/checkbox"));
const LinearScale = dynamic(() => import("./votingTemplate/linearScale"));
const MultipleChoiceGrid = dynamic(
  () => import("./votingTemplate/multipleChoiceGrid")
);
const CheckboxGrid = dynamic(() => import("./votingTemplate/checkboxGrid"));
const ImageChoiceSurvey = dynamic(
  () => import("./votingTemplate/imageChoiceSurvey")
);
const RangeSlider = dynamic(() => import("./votingTemplate/range"));
const StarRating = dynamic(() => import("./votingTemplate/starRating"));
const DropDown = dynamic(() => import("./votingTemplate/dropdown"));
const Legal = dynamic(() => import("./votingTemplate/legal"));
const ContactInfo = dynamic(() => import("./votingTemplate/contactInfo"));
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";
import { useQuestionTypeContext } from "../../hooks/useQuestionTypeContext";

function VotingTemplateSwitch(props: ComponentInputProps) {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  switch (pollOrSurvey === "poll" ? questionType : questionType[props.index]) {
    case "multiple_choice":
      return <MultipleChoice {...props} />;
    case "check_box":
      return <Checkbox {...props} />;
    case "image":
      return <ImageChoice {...props} />;
    case "linear_scale":
      return <LinearScale {...props} />;
    case "star_rating":
      return <StarRating {...props} />;
    case "dropdown":
      return <DropDown {...props} />;
    case "legal":
      return <Legal {...props} />;
    case "contact_info":
      return <ContactInfo {...props} />;
    case "image_choice":
      return <ImageChoiceSurvey {...props} />;
    case "range":
      return <RangeSlider {...props} />;
    case "multiple_choice_grid":
      return <MultipleChoiceGrid {...props} />;
    case "checkbox_grid":
      return <CheckboxGrid {...props} />;
    default:
      return <></>;
  }
}

export default VotingTemplateSwitch;
