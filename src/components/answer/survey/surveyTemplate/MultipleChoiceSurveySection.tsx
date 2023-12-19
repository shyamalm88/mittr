import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ComponentInputProps } from "../../../../types";
import { Box, Typography } from "@mui/material";
import he from "he";
import { useFormContext } from "react-hook-form";

function MultipleChoiceSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();

  return (
    <>
      <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he
            .decode(selectedValue.question)
            .replace(/(<p[^>]+?>|<p>|<\/p>)/gim, ""),
        }}
      ></Typography>

      <Box sx={{ p: 3 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="selectedOption"
          className="answer"
        >
          {selectedValue?.options?.map((item: any, index: number) => {
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
                    {...register(
                      `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].multipleChoice` as const
                    )}
                  />

                  <input
                    type="hidden"
                    value={selectedValue?.required}
                    {...register(
                      `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
                    )}
                  />
                </fieldset>
              </FormControl>
            );
          })}
        </RadioGroup>
      </Box>
    </>
  );
}

export default MultipleChoiceSurveySection;
