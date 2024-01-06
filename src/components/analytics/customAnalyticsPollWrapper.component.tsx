import {
  Card,
  Divider,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import React from "react";
import Analyzer from "./analyze/analyzer.component";
import { AreaChart } from "./chart/AreaChart";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";

function CustomAnalyticsPollWrapper() {
  const { additionalAnswers } = usePollAnalyticsContext();
  const [pollValue, setPollValue] = React.useState<any>([]);
  const handleOptionSection = () => {};
  return (
    <>
      <Divider textAlign="left" sx={{ mt: 2 }}>
        Slice & Dice
      </Divider>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: "column", lg: "row" }}
        useFlexGap
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Analyzer />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: { xs: 1, lg: 5 },
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            useFlexGap
            gap={1}
            sx={{ mt: 2 }}
          >
            {additionalAnswers.map((item: any) => {
              return (
                <FormControl
                  size="small"
                  sx={{ width: "100%" }}
                  key={item.id}
                  className="extraSmall"
                >
                  <InputLabel id="demo-simple-select-label">
                    {item.question}
                  </InputLabel>

                  <Select
                    label={item.question}
                    size="small"
                    value={pollValue}
                    multiple
                    fullWidth
                    onChange={handleOptionSection}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {item.value.map((itm: any) => {
                      return (
                        <MenuItem value={itm} key={itm}>
                          <Checkbox checked={pollValue.indexOf(itm) > -1} />
                          <ListItemText
                            primary={itm}
                            sx={{ fontSize: "11px !important" }}
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            })}
          </Stack>
          <Card
            variant="elevation"
            sx={{
              p: 2,
              my: 2,
              borderRadius: "4px",
              flex: 1,
              width: "100%",
            }}
            className="card"
          >
            <AreaChart />
          </Card>
        </Box>
      </Stack>
    </>
  );
}

export default CustomAnalyticsPollWrapper;
