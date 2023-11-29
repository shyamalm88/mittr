import React from "react";
import { ComponentInputProps } from "../../../types";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Box, InputLabel, Stack } from "@mui/material";
import he from "he";

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
function RangeSurveySection({ selectedValue }: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState(null);
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
  };
  return (
    <>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ p: 3 }}>
        <InputLabel>Range</InputLabel>
        {selectedValue?.options.map((item: any, index: number) => {
          return (
            <Box key={item.id}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
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
              {sliderValue && (
                <Typography component="h2" variant="h5">
                  Selected Value: {sliderValue}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default RangeSurveySection;
