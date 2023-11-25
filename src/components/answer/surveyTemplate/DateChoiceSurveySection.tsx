import { Box, InputLabel, Typography } from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import he from "he";

function DateChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  return (
    <>
      <Typography
        component="div"
        variant="h6"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
        <InputLabel>Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            slotProps={{
              textField: { size: "small" },
            }}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
}

export default DateChoiceSurveySection;
