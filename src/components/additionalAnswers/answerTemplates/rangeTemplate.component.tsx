import React from "react";
import { ComponentInputProps } from "../../../types";
import { styled } from "@mui/material/styles";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";

const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: "primary",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "primary",
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
    background: theme.palette.primary.dark,
    color: "#fff",
    padding: "5px",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {},
    "& > *": {},
  },
}));

export default function RangeTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const answerContext = usePollAnswerContext();
  const [sliderValue, setSliderValue] = React.useState(null);
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
    answerContext.handleChange({
      target: { name: e.target.name, value: e.target.value, id: item._id },
    });
  };
  return (
    <Box sx={{ px: 2 }}>
      <Typography align="center" alignSelf={"end"} variant="caption">
        <b>Selected Value: {sliderValue}</b>
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        min={parseInt(item.rangeStartValue)}
        step={parseInt(item.rangeStepValue)}
        max={parseInt(item.rangeEndValue)}
        onChange={handleSliderChange}
        name={`${fieldName}.selectedValue`}
      />
    </Box>
  );
}
