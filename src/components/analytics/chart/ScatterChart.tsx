import { useTheme } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2008", 1030, 540],
  ["2009", 1000, 400],
  ["2010", 1170, 460],
  ["2011", 660, 1120],
  ["2012", 1030, 540],
];

export function ScatterChart() {
  const theme = useTheme();
  const options = {
    title: "Poll Performance",
    curveType: "function",
    backgroundColor: "transparent",
    legend: {
      position: "bottom",
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
    },
    titleTextStyle: {
      color: theme.palette.mode === "dark" ? "#fff" : "#333",
    },

    hAxis: {
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
    },
    vAxis: {
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
    },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        auraColor: "red",
        color: "yellow",
      },
    },
  };
  return (
    <Chart
      className="googleChart"
      chartType="ScatterChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
}
