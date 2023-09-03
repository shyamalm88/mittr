import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps, QuestionOptionProp } from "../../../types";
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";

const GenderTemplate = ({ fieldName, item }: ComponentInputProps) => {
  const answerContext = usePollAnswerContext();
  const [radioValue, setRadioValue] = React.useState("");
  const [genderValue, setGenderValue] = React.useState([
    { choice: "Male", value: "male" },
    { choice: "Female", value: "female" },
    { choice: "Genderqueer/Non-Binary", value: "non-binary" },
    { choice: "Prefer not to disclose", value: "na" },
  ]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
    answerContext.handleChange(e);
  };
  return (
    <>
      <React.Fragment>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name={`${fieldName}.selectedValue`}
          className="answerPoll"
          onChange={handleChange}
          value={radioValue}
        >
          {genderValue.map((item: any, index: number) => {
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
                    value={item.value}
                    control={<Radio />}
                    label={item.choice}
                  />
                </fieldset>
              </FormControl>
            );
          })}
        </RadioGroup>
      </React.Fragment>
    </>
  );
};
export default GenderTemplate;
