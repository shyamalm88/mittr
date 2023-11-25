import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

function DropDownChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  const options = selectedValue.options[0].dropdownOptions.trim().split(",");
  const [dropDownOptions] = React.useState(options);
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
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
