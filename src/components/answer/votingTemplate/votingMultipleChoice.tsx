import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps, QuestionOptionProp } from "../../../types";
import { usePollQuestionContext } from "../../../hooks/usePollQuestionContext";

function VotingMultipleChoice({
  handleChange,
  radioValue,
}: ComponentInputProps) {
  const contextValue = usePollQuestionContext("options");
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="selectedOption"
      className="answer"
      onChange={handleChange}
      value={radioValue}
    >
      {contextValue?.map((item: QuestionOptionProp, index: number) => {
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
                value={item.option}
                control={<Radio id={item._id} />}
                label={item.option}
              />
            </fieldset>
          </FormControl>
        );
      })}
    </RadioGroup>
  );
}

export default VotingMultipleChoice;
