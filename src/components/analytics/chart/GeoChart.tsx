import React from "react";
import { Chart } from "react-google-charts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { Hidden, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import TextTruncate from "react-text-truncate";

// export const data = [
//   ["Country", "User Interactions"],
//   ["In", 0],
//   ["United States", 0],
//   ["United Kingdom", 0],
//   ["Canada", 0],
//   ["France", 0],
//   ["RU", 0],
// ];

export function GeographyChart({ data, title }: ComponentInputProps) {
  const theme = useTheme();
  const options = {
    title: title,
    backgroundColor: "transparent",
    magnifyingGlass: { enable: true, zoomFactor: 0.6 },
    colorAxis: {
      colors: [theme.palette.success.light, theme.palette.success.dark],
    }, // orange to blue
    datalessRegionColor: "lightGrey",
  };
  return (
    <>
      <Hidden smDown>
        <Divider sx={{ my: 2 }} textAlign="left">
          Diverse Regional User Engagement
        </Divider>
      </Hidden>
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
