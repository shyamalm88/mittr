import React from "react";
import { ComponentInputProps } from "../../types";
import VotingMultipleChoice from "./votingTemplate/votingMultipleChoice";
import VotingImageMultipleChoice from "./votingTemplate/votingImageMultipleChoice";

function AnswerSwitchOnVotingType(props: ComponentInputProps) {
  switch (props.selectedValue) {
    case "multiple_choice":
      return <VotingMultipleChoice />;
    case "image":
      return <VotingImageMultipleChoice />;
    default:
      return <></>;
  }
}

export default AnswerSwitchOnVotingType;
