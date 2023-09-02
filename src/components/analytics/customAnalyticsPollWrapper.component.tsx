import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Analyzer from "./analyze/analyzer.component";
import { LineChart } from "./chart/LineChart";
import { AreaChart } from "./chart/AreaChart";

function CustomAnalyticsPollWrapper() {
  return (
    <>
      <Divider textAlign="left" sx={{ mt: 2 }}>
        Slice & Dice
      </Divider>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Analyzer />
        <Card
          variant="elevation"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 6,
          }}
          className="card"
        >
          <AreaChart />
        </Card>
      </Stack>
    </>
  );
}

export default CustomAnalyticsPollWrapper;
