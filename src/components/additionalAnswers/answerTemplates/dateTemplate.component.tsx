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

export default function DateTemplate({ fieldName, item }: ComponentInputProps) {
  const [date, setDate] = React.useState<Date>();
  const [displayCalender, setDisplayCalender] = React.useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    setDate(date);
    setDisplayCalender(false);
  };

  return (
    <>
      <FormControl variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          size="small"
          sx={{
            borderRadius: "4px",
            mb: 1,
          }}
          className="input"
          onClick={(e) => setDisplayCalender(!displayCalender)}
          placeholder="DD/MM/YYYY"
          value={moment(date).format("DD/MM/YYYY")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
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
