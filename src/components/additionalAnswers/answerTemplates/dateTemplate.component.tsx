import React from "react";
import { ComponentInputProps } from "../../../types";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import { Calendar } from "react-date-range";
import FormControl from "@mui/material/FormControl";
import Today from "@mui/icons-material/Today";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import moment from "moment";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";

export default function DateTemplate({ fieldName, item }: ComponentInputProps) {
  const [date, setDate] = React.useState<Date>();
  const [displayCalender, setDisplayCalender] = React.useState<boolean>(false);
  const answerContext = usePollAnswerContext();

  const handleDateChange = (date: Date) => {
    setDate(date);
    setDisplayCalender(false);
  };

  React.useEffect(() => {
    answerContext.handleChange({
      target: { name: `${fieldName}.selectedValue`, value: date },
    });
  }, [date]);

  return (
    <>
      <FormControl variant="outlined">
        <OutlinedInput
          type="text"
          size="small"
          sx={{
            borderRadius: "4px",
            mb: 1,
          }}
          name={`${fieldName}.selectedValue`}
          className="input"
          onClick={(e) => setDisplayCalender(!displayCalender)}
          placeholder="DD/MM/YYYY"
          value={moment(date).format("DD/MM/YYYY")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle date visibility"
                edge="end"
                onClick={(e) => setDisplayCalender(!displayCalender)}
              >
                <Today />
              </IconButton>
            </InputAdornment>
          }
          label=""
        />
      </FormControl>
      {displayCalender && (
        <ClickAwayListener onClickAway={(e) => setDisplayCalender(false)}>
          <div
            style={{
              width: "300px",
              position: "absolute",
              zIndex: 9,
              top: "50%",
            }}
          >
            <Calendar onChange={(date) => handleDateChange(date)} date={date} />
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}
