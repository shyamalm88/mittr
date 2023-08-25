import React from "react";
import { Chart } from "react-google-charts";
import { useTheme } from "@mui/material";

export const data = [
  ["Interactions By", "Count"],
  ["Male", 11],
  ["Female", 5],
  ["Transgender", 6],
  ["Not Mentioned", 2],
];

export function PieChart() {
  const theme = useTheme();
  const options = {
    pieHole: 0.5,
    title: "Poll activity analytics on Gender Diversity",
    backgroundColor: "transparent",
    is3D: true,
    slices: {
      3: { offset: 0.2 },
    },
    titleTextStyle: {
      color: theme.palette.mode === "dark" ? "#fff" : "#333",
    },
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
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"200px"}
    />
  );
}
