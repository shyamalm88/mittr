import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { QuestionOptionProp } from "../../../../types";
import { usePollQuestionContext } from "../../../../hooks/usePollQuestionContext";
import { useFormContext } from "react-hook-form";

function VotingMultipleChoice() {
  const contextValue = usePollQuestionContext("options");
  const {
    formState: { errors },
    register,
    getValues,
  } = useFormContext();
  const handleChange = (e: any) => {};
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      className="answer"
      onChange={handleChange}
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
                {...register(`selectedPrimaryQuestionOption` as const)}
              />
            </fieldset>
          </FormControl>
        );
      })}
    </RadioGroup>
  );
}

export default VotingMultipleChoice;
