import * as React from "react";
import { Divider } from "@mui/material";
import { usePollAnswerContext } from "../../hooks/usePollAnswerContext";
import AnswerSwitchOnVotingType from "./answerSwitchOnVotingType";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";

const AnswerPollOptionWrapper = () => {
  const questionContext = usePollQuestionContext();
  const answerContext = usePollAnswerContext();
  const [radioValue, setRadioValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(
    questionContext.votingType
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
    answerContext.handleChange(e);
  };

  return (
    <>
      <React.Fragment>
        <AnswerSwitchOnVotingType
          handleChange={handleChange}
          radioValue={radioValue}
          selectedValue={selectedValue}
        />
      </React.Fragment>
      <Divider sx={{ mb: 0.2, mr: "35px", ml: "10px" }} textAlign="center">
        {/* <small>Related Topics</small> */}
      </Divider>
      {/* {topicValue.map((item: any, index: number) => {
        return (
          <Chip
            key={index}
            label={item.label}
            variant="outlined"
            size="small"
            sx={{ m: 0.3, height: "18px", fontSize: "9px" }}
            color="info"
          />
        );
      })} */}
    </>
  );
};
export default AnswerPollOptionWrapper;
