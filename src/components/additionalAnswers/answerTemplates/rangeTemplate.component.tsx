import React from "react";
import { ComponentInputProps } from "../../../types";
import { styled } from "@mui/material/styles";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const PrettoSlider = styled(Slider)({
  color: "#1976d2",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#7291db",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#1976d2",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function RangeTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState(null);
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
  };
  return (
    <>
      <Typography align="center" alignSelf={"end"} variant="caption">
        <b>Selected Value: {sliderValue}</b>
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min={parseInt(item.rangeStartValue)}
        step={1}
        max={parseInt(item.rangeEndValue)}
        onChange={handleSliderChange}
      />
    </>
  );
}
