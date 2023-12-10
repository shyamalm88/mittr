import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";
import { TextField } from "@mui/material";

export default function DateTemplate({ fieldName, item }: ComponentInputProps) {
  const [date, setDate] = React.useState<string | undefined>();

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
    control,
  } = useFormContext();
  const handleChange = (e: any) => {
    setValue(`${fieldName}.selectedValue.date`, moment(e).format());
    console.log(getValues());
    setDate(e && moment(e).format());
  };

  return (
    <>
      <FormControl variant="outlined">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            formatDensity="dense"
            disableFuture={item.dateValidationOption === "disable_future_dates"}
            disablePast={item.dateValidationOption === "disable_past_dates"}
            format="DD/MM/YYYY"
            yearsPerRow={4}
            onChange={(newValue) => handleChange(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>

        <input
          type="hidden"
          value={item.id}
          {...register(`${fieldName}.questionId` as const)}
        />
      </FormControl>
    </>
  );
}
