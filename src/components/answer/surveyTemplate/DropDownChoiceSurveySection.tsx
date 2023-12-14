import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import he from "he";
import { useFormContext } from "react-hook-form";

function DropDownChoiceSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const theme = useTheme();
  const options = selectedValue.options[0].dropdownOptions
    .replace(/ /g, "")
    .split(",");
  const [dropDownOptions] = React.useState(options);

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
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select from below Options
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select from below Options"
            {...register(
              `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].dropdown` as const
            )}
          >
            {dropDownOptions.map((item: any, index: number) => {
              return (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>

          <input
            type="hidden"
            value={selectedValue?.required}
            {...register(
              `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
            )}
          />
        </FormControl>
      </Box>
    </>
  );
}

export default DropDownChoiceSurveySection;
