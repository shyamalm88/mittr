import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
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
          <MobileDateTimePicker
            disablePast
            formatDensity="dense"
            value={date}
            format="DD/MM/YYYY, h:mm a"
            onChange={(newValue) => handleChange(newValue)}
            yearsPerRow={4}
            viewRenderers={{
              minutes: null,
              seconds: null,
            }}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
}
