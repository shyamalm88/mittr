import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps } from "../../../types";
import { useFormContext } from "react-hook-form";

const RadioTemplate = ({ fieldName, item }: ComponentInputProps) => {
  const [radioValue, setRadioValue] = React.useState("");

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();
  const handleChange = (e: any) => {
    setValue(`${fieldName}.selectedValue.multipleChoice`, e.target.value);
    setRadioValue(e.target.value);
    console.log(getValues());
  };

  return (
    <>
      <React.Fragment>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          className="answer"
          onChange={handleChange}
          value={radioValue}
        >
          {item.choices.map((itemIndividual: any, index: number) => {
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
                    value={itemIndividual.choice}
                    control={<Radio />}
                    label={itemIndividual.choice}
                    {...register(
                      `${fieldName}.selectedValue.multipleChoice` as const
                    )}
                  />
                  <input
                    type="hidden"
                    value={item.id}
                    {...register(`${fieldName}.questionId` as const)}
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
export default RadioTemplate;
