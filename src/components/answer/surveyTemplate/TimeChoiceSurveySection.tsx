import { Box, InputLabel, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";
import { ComponentInputProps } from "../../../types";
import he from "he";

function TimeChoiceSurveySection({ selectedValue }: ComponentInputProps) {
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
        <InputLabel>Time</InputLabel>
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
