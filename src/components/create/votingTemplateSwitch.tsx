import { ComponentInputProps } from "../../types";
import MultipleChoice from "./votingTemplate/multipleChoice";
import ImageChoice from "./votingTemplate/imageChoice";
import Checkbox from "./votingTemplate/checkbox";
import LinearScale from "./votingTemplate/linearScale";
import MultipleChoiceGrid from "./votingTemplate/multipleChoiceGrid";
import CheckboxGrid from "./votingTemplate/checkboxGrid";
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
    case "multiple_choice_grid":
      return <MultipleChoiceGrid {...props} />;
    case "checkbox_grid":
      return <CheckboxGrid {...props} />;
    default:
      return <></>;
  }
}

export default VotingTemplateSwitch;