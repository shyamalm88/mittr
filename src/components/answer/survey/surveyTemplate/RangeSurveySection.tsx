import React from "react";
import { ComponentInputProps } from "../../../../types";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Box, InputLabel, Stack } from "@mui/material";
import he from "he";
import { Controller, useFormContext } from "react-hook-form";

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
function RangeSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const [sliderValue, setSliderValue] = React.useState(null);
  const {
    formState: { errors },
    register,
    getValues,
    setValue,
    control,
  } = useFormContext();
  const handleSliderChange = (e: any) => {
    setSliderValue(e.target.value);
    setValue(
      `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].range`,
      e.target.value
    );
  };
  return (
    <>
      <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
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
                <Controller
                  name={`${fieldName}.segments[${actualIndex}].selectedValue[${idx}].range`}
                  control={control}
                  render={({
                    field: { onChange, value, ...restField },
                    fieldState: { error },
                  }) => (
                    <>
                      <input
                        value={value}
                        hidden
                        {...register(
                          `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].range` as const,
                          {
                            required: false,
                          }
                        )}
                      />
                      <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={parseInt(item.startValue)}
                        step={parseInt(item.stepValue)}
                        max={parseInt(item.endValue)}
                        onChange={handleSliderChange}
                        //   name={`${fieldName}.selectedValue`}
                      />
                    </>
                  )}
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
              <input
                type="hidden"
                value={selectedValue?.required}
                {...register(
                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
                )}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default RangeSurveySection;
