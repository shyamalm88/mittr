import React from "react";
import { Chart } from "react-google-charts";
import { useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";

export function PieChart({ title, data }: ComponentInputProps) {
  const theme = useTheme();
  const slice = data[data.length - 1][1] ? data.length - 2 : 0;
  const options = {
    pieHole: 0.5,
    title: title,
    backgroundColor: "transparent",
    is3D: true,
    slices: {
      [slice]: { offset: 0.2 },
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
