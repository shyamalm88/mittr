import {
  Box,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

function EmailChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3 }}>
        <OutlinedInput
          placeholder="Please enter your Email. e.g. john.doe@example.com"
          fullWidth
          size="small"
          margin="dense"
          sx={{
            borderRadius: "4px",
          }}
          className="input"
          startAdornment={
            <InputAdornment
              position="start"
              sx={{ color: theme.palette.action.disabled }}
            >
              <MarkEmailReadOutlinedIcon />
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
}

export default EmailChoiceSurveySection;
