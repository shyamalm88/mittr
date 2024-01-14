import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { usePollAnalyticsContext } from "../../../hooks/usePollAnalyticsContext";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { ComponentInputProps } from "../../../types";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [
  {
    value: 7,
  },
  {
    value: 14,
  },
  {
    value: 28,
  },
  {
    value: 90,
  },
  {
    value: 180,
  },
  {
    value: 365,
  },
];

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,

    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

function Analyzer({ register, setValue }: ComponentInputProps) {
  const { questionID, additionalAnswers } = usePollAnalyticsContext();
  const { additionalQuestions, options } = questionID;

  const [pollValue, setPollValue] = React.useState<any>([]);
  const [dateRange, setDateRange] = React.useState<number[]>([7, 60]);
  const minDistance = 10;

  const handleOptionSection = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setPollValue(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setDateRange([
        Math.min(newValue[0], dateRange[1] - minDistance),
        dateRange[1],
      ]);
    } else {
      setDateRange([
        dateRange[0],
        Math.max(newValue[1], dateRange[0] + minDistance),
      ]);
    }
  };

  React.useEffect(() => {
    setValue("dayRange", dateRange);
  }, [dateRange]);

  React.useEffect(() => {
    setPollValue(questionID.options.map((x: any) => x.option));
    setValue(
      "pollOptions",
      questionID.options.map((x: any) => x.option)
    );
  }, []);

  React.useEffect(() => {
    setValue("pollOptions", pollValue);
  }, [pollValue]);

  return (
    <Card
      variant="elevation"
      sx={{
        p: 2,
        my: 2,
        borderRadius: "4px",
        flex: 2,
      }}
      className="card"
    >
      <Typography variant="body1" color="inherit">
        Poll Analytics
      </Typography>
      <Divider />
      <Stack
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ mt: 2 }}
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <FormControl size="small" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Poll Options</InputLabel>
          <Tooltip title={pollValue.join(", ")}>
            <Select
              label="Poll Options"
              size="small"
              multiple
              fullWidth
              value={pollValue}
              onChange={handleOptionSection}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected: []) => selected.join(", ")}
            >
              {options?.map((item: any) => {
                return (
                  <MenuItem value={item.option} key={item.id}>
                    <Checkbox checked={pollValue.indexOf(item.option) > -1} />
                    <ListItemText primary={item.option} />
                  </MenuItem>
                );
              })}
            </Select>
          </Tooltip>
        </FormControl>
        <FormControl size="small">
          <IOSSlider
            value={dateRange}
            onChange={handleChangeSlider}
            marks={marks}
            valueLabelDisplay="on"
            max={365}
            min={0}
            disableSwap
          />
          <Stack direction="row" spacing={2}>
            <TextField
              id=""
              label=""
              value={`${dateRange[0]} Day(s)`}
              size="small"
              inputProps={{ readOnly: true }}
            />
            <TextField
              id=""
              label=""
              value={`${dateRange[1]} Day(s)`}
              size="small"
              inputProps={{ readOnly: true }}
            />
          </Stack>
        </FormControl>
      </Stack>
    </Card>
  );
}

export default Analyzer;
