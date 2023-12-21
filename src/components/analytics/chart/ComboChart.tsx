import { useTheme } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
import { ComponentInputProps } from "../../../types";

export const data = [
  ["Month", "Leonardo Da Vinci", "Michel Angelo", "King Arthur"],
  ["2004/05", 5, 0, 2],
  ["2005/06", 11, 1, 1],
  ["2006/07", 3, 5, 0],
];

export function ComboChart({ data, title }: ComponentInputProps) {
  const theme = useTheme();
  const options = {
    title: title,
    subtitle: "user interactions",
    backgroundColor: "transparent",
    is3D: true,
    legend: {
      position: "bottom",
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
      pagingTextStyle: { color: "grey" },
      scrollArrows: {
        inactiveColor: theme.palette.mode === "dark" ? "grey" : "lightGrey",
        activeColor: theme.palette.mode === "dark" ? "lightGrey" : "grey",
      },
    },
    vAxis: {
      title: "Cups",
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
    },
    hAxis: {
      title: "Month",
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
      },
    },
    titleTextStyle: {
      color: theme.palette.mode === "dark" ? "#fff" : "#333",
    },
    seriesType: "bars",
    series: { 3: { type: "line" } },
  };

  return (
    <Chart
      className="googleChart"
      chartType="ComboChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
}
