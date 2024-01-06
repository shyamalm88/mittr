import { Card, Stack } from "@mui/material";
import React from "react";
import { LineChart } from "./chart/LineChart";
import { PieChart } from "./chart/PieChart";
import { ComboChart } from "./chart/ComboChart";
import { GeographyChart } from "./chart/GeoChart";
import CustomAnalyticsPollWrapper from "./customAnalyticsPollWrapper.component";
import { ComponentInputProps } from "../../types";

function DefaultAnalyticsPollWrapper({
  lineData,
  pieData,
  geoData,
  comboData,
}: ComponentInputProps) {
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: "column", lg: "row" }}
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
            width: "100%",
          }}
          className="card"
        >
          <LineChart single data={lineData} />
        </Card>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 1,
            width: "100%",
          }}
          className="card"
        >
          <PieChart
            data={pieData}
            title="Poll activity analytics on Gender Diversity"
          />
        </Card>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: "4px",
            flex: 1,
            width: "100%",
          }}
          className="card"
        >
          <ComboChart title="Monthly Selected Option" data={comboData} />
        </Card>
      </Stack>
      <CustomAnalyticsPollWrapper />
      <GeographyChart data={geoData} title="Diverse Regional User Engagement" />
    </>
  );
}

export default DefaultAnalyticsPollWrapper;
