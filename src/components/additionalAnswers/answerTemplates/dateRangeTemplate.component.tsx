import React from "react";
import { ComponentInputProps } from "../../../types";
import { DateRangePicker } from "react-date-range";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import EventIcon from "@mui/icons-material/Event";
import Today from "@mui/icons-material/Today";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

export default function DateRangeTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const [openDateRangePicker, setOpenDateRangePicker] = React.useState(false);
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const startDateRef = React.useRef(null);
  const endDateRef = React.useRef(null);
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleDatePicker = (e: any, ref: any) => {
    const y = ref.current.getBoundingClientRect().top;
    const x = ref.current.getBoundingClientRect().left;
    setCoords({
      x,
      y,
    });
    setOpenDateRangePicker(true);
  };

  const handleClickAway = (e: any) => {
    if (
      e.target.id.includes("startDateRange") ||
      e.target.id.includes("endDateRange")
    ) {
    } else {
      setOpenDateRangePicker(false);
    }
  };

  const closeDatePicker = () => {
    setCoords({
      x: 0,
      y: 0,
    });
    setOpenDateRangePicker(false);
  };

  React.useEffect(() => {
    setStartDate(moment(state[0].startDate).format("DD/MM/YYYY"));
    setEndDate(moment(state[0].endDate).format("DD/MM/YYYY"));
  }, [state]);

  return (
    <>
      <FormControl variant="outlined">
        <OutlinedInput
          id="startDateRange-1"
          type="text"
          size="small"
          sx={{
            borderRadius: "4px",
            mb: 1,
          }}
          ref={startDateRef}
          value={startDate}
          className="input"
          onClick={(e) => toggleDatePicker(e, startDateRef)}
          placeholder="DD/MM/YYYY"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={(e) => toggleDatePicker(e, startDateRef)}
              >
                <Today />
              </IconButton>
            </InputAdornment>
          }
          label=""
        />
      </FormControl>
      <FormControl variant="outlined">
        <OutlinedInput
          id="endDateRange-1"
          type="text"
          size="small"
          sx={{
            borderRadius: "4px",
            mb: 1,
          }}
          ref={endDateRef}
          className="input"
          onClick={(e) => toggleDatePicker(e, endDateRef)}
          placeholder="DD/MM/YYYY"
          value={endDate}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={(e) => toggleDatePicker(e, endDateRef)}
              >
                <EventIcon />
              </IconButton>
            </InputAdornment>
          }
          label=""
        />
      </FormControl>
      {openDateRangePicker && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            style={{
              position: "absolute",
              top: coords.y + window.scrollY - 565,
              zIndex: 9,
            }}
          >
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: "-15px",
                zIndex: 10,
                top: "-15px",
              }}
              onClick={closeDatePicker}
            >
              <HighlightOffIcon />
            </IconButton>
            <DateRangePicker
              onChange={(item: any) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="vertical"
            />
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}
