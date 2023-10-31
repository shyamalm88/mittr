import { Box, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";
import { ComponentInputProps } from "../../../types";

function TimeChoiceSurveySection({ selectedValue }: ComponentInputProps) {
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3 }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
            slotProps={{
              textField: { size: "small" },
            }}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
}

export default TimeChoiceSurveySection;
