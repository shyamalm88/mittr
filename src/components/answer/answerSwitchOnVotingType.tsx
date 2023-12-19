import React from "react";
import { ComponentInputProps } from "../../types";
import VotingMultipleChoice from "./poll/pollTemplate/votingMultipleChoice";
import VotingImageMultipleChoice from "./poll/pollTemplate/votingImageMultipleChoice";

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
