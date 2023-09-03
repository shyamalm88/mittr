import React from "react";
import { Chart } from "react-google-charts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useTheme } from "@mui/material";

export const data = [
  ["Country", "User Interactions"],
  ["India", 1200],
  ["United States", 100],
  ["United Kingdom", 900],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

export function GeographyChart() {
  const theme = useTheme();
  const options = {
    title: "ABCD",
    backgroundColor: "transparent",
    magnifyingGlass: { enable: true, zoomFactor: 0.6 },
    // displayMode: "markers",
    colorAxis: {
      colors: [theme.palette.success.light, theme.palette.success.dark],
    }, // orange to blue
    // mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    datalessRegionColor: "lightGrey",
  };
  return (
    <>
      <Divider textAlign="left" sx={{ mt: 2 }}>
        Diverse Regional User Engagement
      </Divider>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </>
  );
}
