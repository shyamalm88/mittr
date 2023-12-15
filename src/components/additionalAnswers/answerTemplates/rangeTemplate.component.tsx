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
import { useFormContext } from "react-hook-form";

const RangeSlider = styled(Slider)(({ theme }) => ({
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
  index,
}: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState<number>(
    parseInt(item.rangeStartValue)
  );
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
    setValue(`${fieldName}.selectedValue.range`, e.target.value);
  };

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();

  return (
    <Box sx={{ px: 2 }}>
      <Typography align="center" alignSelf={"end"} variant="caption">
        <b>Selected Value: {sliderValue}</b>
      </Typography>
      <RangeSlider
        valueLabelDisplay="auto"
        aria-label="Range slider"
        min={parseInt(item.rangeStartValue)}
        step={parseInt(item.rangeStepValue)}
        max={parseInt(item.rangeEndValue)}
        onChange={handleSliderChange}
      />

      <input
        type="hidden"
        value={item.id}
        {...register(`${fieldName}.questionId` as const)}
      />
    </Box>
  );
}
