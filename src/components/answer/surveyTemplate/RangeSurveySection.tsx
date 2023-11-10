import React from "react";
import { ComponentInputProps } from "../../../types";
import { styled } from "@mui/material/styles";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
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
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
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
}));
function RangeSurveySection({ selectedValue }: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState(null);
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
  };
  return (
    <>
      <Typography component="div" variant="h6">
        {selectedValue.question}
      </Typography>
      <Box sx={{ p: 3 }}>
        {selectedValue?.options.map((item: any) => {
          return (
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
              key={item.id}
            >
              <Typography component="h2" variant="h5">
                {parseInt(item.startValue)}
              </Typography>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                min={parseInt(item.startValue)}
                step={parseInt(item.stepValue)}
                max={parseInt(item.endValue)}
                onChange={handleSliderChange}
                //   name={`${fieldName}.selectedValue`}
              />
              <Typography component="h2" variant="h5">
                {parseInt(item.endValue)}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </>
  );
}

export default RangeSurveySection;
