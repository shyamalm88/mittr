import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";

export default function DateTemplate({ fieldName, item }: ComponentInputProps) {
  const [date, setDate] = React.useState();
  const answerContext = usePollAnswerContext();
  const handleChange = (e: React.ChangeEvent<HTMLElement> | any) => {
    answerContext.handleChange({
      target: {
        name: `${fieldName}.selectedValue`,
        value: moment(e).format(),
        id: item._id,
      },
    });
  };

  return (
    <>
      <FormControl variant="outlined">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            formatDensity="dense"
            value={date}
            disableFuture={item.dateValidationOption === "disable_future_dates"}
            disablePast={item.dateValidationOption === "disable_past_dates"}
            format="DD/MM/YYYY"
            onChange={(newValue) => handleChange(newValue)}
            yearsPerRow={4}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
}
