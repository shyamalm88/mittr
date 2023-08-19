import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import { QuestionOptionProp } from "../../types";

const AnswerPollOptionWrapper = () => {
  const contextValue = usePollQuestionContext("options");
  const topicValue = usePollQuestionContext("topic");

  return (
    <>
      <React.Fragment>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          className="answerPoll"
        >
          {contextValue.map((item: QuestionOptionProp, index: number) => {
            const fieldName = `options[${index}]`;
            return (
              <FormControl
                sx={{ mb: 1, width: "100%" }}
                variant="outlined"
                key={index}
              >
                <fieldset
                  name={fieldName}
                  style={{
                    border: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormControlLabel
                    value={`options[${index}]`}
                    control={<Radio />}
                    label={item.option}
                  />
                </fieldset>
              </FormControl>
            );
          })}
        </RadioGroup>
      </React.Fragment>
      {topicValue.map((item: any, index: number) => {
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
      })}
    </>
  );
};
export default AnswerPollOptionWrapper;
