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

export default function DateTemplate({ fieldName, item }: ComponentInputProps) {
  const [date, setDate] = React.useState<Date>();
  const [displayCalender, setDisplayCalender] = React.useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    setDate(date);
    setDisplayCalender(false);
  };

  return (
    <>
      {/* <Typography align="center" alignSelf={"end"} variant="caption">
        Select Date
      </Typography> */}
      {/*<LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker sx={{ background: "#fff", borderRadius: "4px" }} />
      </LocalizationProvider> */}
      <FormControl variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          size="small"
          sx={{
            background: "#fff",
            borderRadius: "4px",
            mb: 1,
          }}
          onClick={(e) => setDisplayCalender(true)}
          placeholder="DD/MM/YYYY"
          value={moment(date).format("DD/MM/YYYY")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={(e) => setDisplayCalender(true)}
              >
                <Today />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {displayCalender && (
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
      )}
    </>
  );
}
