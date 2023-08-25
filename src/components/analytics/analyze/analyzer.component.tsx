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
} from "@mui/material";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
const impressionOrEngagements = [
  { id: 1, value: "Engagements" },
  { id: 1, value: "Impressions" },
];
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
    "&:before": {
      content: '"Days"',
      rotate: "315deg",
      position: "absolute",
      top: "-2px",
      left: "80%",
    },
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

function Analyzer() {
  const analyticsValue = usePollAnalyticsContext();
  const [pollValue, setPollValue] = React.useState<any>([]);

  const handleOptionSection = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setPollValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        mt: 2,
        mb: 0,
        borderRadius: "4px",
        flex: 2,
      }}
      className="card"
    >
      <Typography variant="body1" color="inherit">
        Poll Performance
      </Typography>
      <Divider />
      <Stack
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-start"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ mt: 2 }}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <FormControl size="small" sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Poll Options</InputLabel>
          <Select
            id="demo-simple-select"
            label="Poll Options"
            size="small"
            multiple
            value={pollValue}
            onChange={handleOptionSection}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {analyticsValue.options.map((item: any) => {
              return (
                <MenuItem value={item.option} key={item.id}>
                  <Checkbox checked={pollValue.indexOf(item.option) > -1} />
                  <ListItemText primary={item.option} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "20%" }}>
          <IOSSlider
            aria-label="ios slider"
            defaultValue={60}
            marks={marks}
            valueLabelDisplay="on"
            max={365}
            min={7}
          />
        </FormControl>
        <FormControl size="small" sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            Filtering Criteria
          </InputLabel>
          <Select
            id="demo-simple-select"
            label="Poll Options"
            size="small"
            multiple
            value={pollValue}
            onChange={handleOptionSection}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {analyticsValue.options.map((item: any) => {
              return (
                <MenuItem value={item.option} key={item.id}>
                  <Checkbox checked={pollValue.indexOf(item.option) > -1} />
                  <ListItemText primary={item.option} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            Filtering Criteria
          </InputLabel>
          <Select
            id="demo-simple-select"
            label="Poll Options"
            size="small"
            multiple
            value={pollValue}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {impressionOrEngagements.map((item: any) => {
              return (
                <MenuItem value={item.value} key={item.id}>
                  <Checkbox
                    checked={impressionOrEngagements.indexOf(item.value) > -1}
                  />
                  <ListItemText primary={item.value} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </Card>
  );
}

export default Analyzer;
