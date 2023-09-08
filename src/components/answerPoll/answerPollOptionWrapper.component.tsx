import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import { QuestionOptionProp } from "../../types";
import { Divider } from "@mui/material";
import { usePollAnswerContext } from "../../hooks/usePollAnswerContext";

const AnswerPollOptionWrapper = () => {
  const contextValue = usePollQuestionContext("options");
  const { multipleSelection } = usePollQuestionContext("settings") || {};
  const answerContext = usePollAnswerContext();
  const [radioValue, setRadioValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
    answerContext.handleChange(e);
  };

  return (
    <>
      <React.Fragment>
        {!multipleSelection ? (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="selectedOption"
            className="answerPoll"
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
        ) : (
          <>
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
                      control={<Checkbox />}
                      label={item.option}
                    />
                  </fieldset>
                </FormControl>
              );
            })}
          </>
        )}
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
