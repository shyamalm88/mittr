import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ComponentInputProps } from "../../../types";
import { Box, Checkbox, Typography } from "@mui/material";
import he from "he";
import { useFormContext } from "react-hook-form";

function CheckBoxChoiceSurveySection({
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
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
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
                  control={
                    <Checkbox
                      id={item._id}
                      {...register(
                        `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].checkbox[${index}].choice` as const
                      )}
                    />
                  }
                  label={item.choice}
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
      </Box>
    </>
  );
}

export default CheckBoxChoiceSurveySection;
