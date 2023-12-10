import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps } from "../../../types";
import { useFormContext } from "react-hook-form";

const GenderTemplate = ({ fieldName, item }: ComponentInputProps) => {
  const [radioValue, setRadioValue] = React.useState("");
  const [genderValue, setGenderValue] = React.useState([
    { choice: "Male", value: "male" },
    { choice: "Female", value: "female" },
    { choice: "Genderqueer/Non-Binary", value: "non-binary" },
    { choice: "Prefer not to disclose", value: "na" },
  ]);

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`${fieldName}.selectedValue.gender`, e.target.value);
    console.log(getValues());
    setRadioValue(e.target.value);
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
          {genderValue.map((itemIndividual: any, index: number) => {
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
                    value={itemIndividual.value}
                    control={<Radio />}
                    label={itemIndividual.choice}
                    {...register(`${fieldName}.selectedValue.gender` as const)}
                  />
                </fieldset>
              </FormControl>
            );
          })}
        </RadioGroup>
        <input
          type="hidden"
          value={item.id}
          {...register(`${fieldName}.questionId` as const)}
        />
      </React.Fragment>
    </>
  );
};
export default GenderTemplate;
