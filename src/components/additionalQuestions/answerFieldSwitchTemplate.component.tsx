import RangeTemplate from "./InputTemplates/Range.template";
import RadioTemplate from "./InputTemplates/Radio.template";
import { ComponentInputProps } from "../../types";
import CheckboxTemplate from "./InputTemplates/Checkbox.template";
import LinearScaleTemplate from "./InputTemplates/LinearScale.template";
import DateTemplate from "./InputTemplates/Date.template";

export default function AnswerFieldSwitchTemplate({
  selectedValue,
  fieldName,
  index,
}: ComponentInputProps) {
  switch (selectedValue) {
    case "date":
      return <DateTemplate fieldName={fieldName} />;
    case "range":
      return <RangeTemplate fieldName={fieldName} index={index} />;
    case "choice":
      return <RadioTemplate fieldName={fieldName} index={index} />;
    case "check":
      return <CheckboxTemplate fieldName={fieldName} />;
    case "linear_scale":
      return <LinearScaleTemplate fieldName={fieldName} />;

    default:
      return <></>;
  }
}
