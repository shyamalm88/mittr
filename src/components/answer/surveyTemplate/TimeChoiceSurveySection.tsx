import { Box, InputLabel, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React from "react";
import { ComponentInputProps } from "../../../types";
import he from "he";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

function TimeChoiceSurveySection({
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
    control,
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
        <InputLabel>Time</InputLabel>
        <Controller
          name={`${fieldName}.segments[${actualIndex}].selectedValue[${idx}].time`}
          control={control}
          render={({
            field: { onChange, value, ...restField },
            fieldState: { error },
          }) => (
            <>
              <input
                value={value}
                hidden
                {...register(
                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].time` as const,
                  {
                    required: false,
                  }
                )}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  onChange={(event: any) => {
                    onChange(moment(event).format("h:mm a"));
                  }}
                />
              </LocalizationProvider>
            </>
          )}
        />
        <input
          type="hidden"
          value={selectedValue?.required}
          {...register(
            `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
          )}
        />
      </Box>
    </>
  );
}

export default TimeChoiceSurveySection;
