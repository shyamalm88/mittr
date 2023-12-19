import { Box, InputLabel, Typography } from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import he from "he";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

function DateChoiceSurveySection({
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
        <InputLabel>Date</InputLabel>
        <Controller
          name={`${fieldName}.segments[${actualIndex}].selectedValue[${idx}].date`}
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
                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].date` as const,
                  {
                    required: false,
                  }
                )}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  slotProps={{
                    textField: { size: "small" },
                  }}
                  onChange={(event: any) => {
                    onChange(moment(event).format());
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

export default DateChoiceSurveySection;
