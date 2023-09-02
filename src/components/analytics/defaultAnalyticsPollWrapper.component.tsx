import { Card, Stack } from "@mui/material";
import React from "react";
import { LineChart } from "./chart/LineChart";
import { PieChart } from "./chart/PieChart";
import { ComboChart } from "./chart/ComboChart";
import { GeographyChart } from "./chart/GeoChart";
import CustomAnalyticsPollWrapper from "./customAnalyticsPollWrapper.component";

function DefaultAnalyticsPollWrapper() {
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 2,
          }}
          className="card"
        >
          <LineChart />
        </Card>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 1,
          }}
          className="card"
        >
          <PieChart />
        </Card>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 1,
          }}
          className="card"
        >
          <ComboChart />
        </Card>
      </Stack>
      <CustomAnalyticsPollWrapper />
      <GeographyChart />
    </>
  );
}

export default DefaultAnalyticsPollWrapper;
