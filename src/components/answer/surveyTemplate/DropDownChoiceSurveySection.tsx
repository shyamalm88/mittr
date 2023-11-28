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

function DropDownChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  const options = selectedValue.options[0].dropdownOptions.trim().split(",");
  const [dropDownOptions] = React.useState(options);
  return (
    <>
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
          >
            {dropDownOptions.map((item: any, index: number) => {
              return (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default DropDownChoiceSurveySection;
