import React from "react";
import { ComponentInputProps } from "../../types";
import MultipleChoice from "./votingTemplate/multipleChoice";
import ImageChoice from "./votingTemplate/imageChoice";

function VotingTemplateSwitch(props: ComponentInputProps) {
  switch (props.selectedValue) {
    case "multiple_choice":
      return <MultipleChoice {...props} />;
    case "image":
      return <ImageChoice {...props} />;
    default:
      return <></>;
  }
}

export default VotingTemplateSwitch;
