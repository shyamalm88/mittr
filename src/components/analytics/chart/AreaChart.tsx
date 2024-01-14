import React from "react";
import { Chart } from "react-google-charts";
import { faker } from "@faker-js/faker";
import { useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";

// export const data = [
//   ["Month", "Anonymous Users vote", "Logged-in Users vote"],
//   [
//     "Jan",
//     faker.number.int({ min: 0, max: 70 }),
//     faker.number.int({ min: 0, max: 200 }),
//   ],
//   [
//     "Feb",
//     faker.number.int({ min: 0, max: 210 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "Mar",
//     faker.number.int({ min: 0, max: 10 }),
//     faker.number.int({ min: 0, max: 200 }),
//   ],
//   [
//     "Apr",
//     faker.number.int({ min: 0, max: 200 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "May",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 200 }),
//   ],
//   [
//     "Jun",
//     faker.number.int({ min: 0, max: 200 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "Jul",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 200 }),
//   ],
//   [
//     "Aug",
//     faker.number.int({ min: 0, max: 200 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "Sep",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 20 }),
//   ],
//   [
//     "Oct",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "Nov",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
//   [
//     "Dec",
//     faker.number.int({ min: 0, max: 100 }),
//     faker.number.int({ min: 0, max: 100 }),
//   ],
// ];

// export const singleData = [
//   ["Month", "Anonymous Users vote"],
//   ["Jan", faker.number.int({ min: 0, max: 70 })],
//   ["Mar", faker.number.int({ min: 0, max: 10 })],
//   ["May", faker.number.int({ min: 0, max: 100 })],
//   ["Jul", faker.number.int({ min: 0, max: 100 })],
//   ["Sep", faker.number.int({ min: 0, max: 100 })],
//   ["Nov", faker.number.int({ min: 0, max: 100 })],
// ];

export function AreaChart({
  white,
  single,
  noLegends,
  title,
  data,
}: ComponentInputProps) {
  const theme = useTheme();

  const options = {
    title: title,
    subtitle: "user interactions",
    colors: white
      ? ["#fff", "#fff", "#fff", "#fff"]
      : ["#2979FF", "#FF7728", "#E8471A", "#FF2D1C"],
    is3D: true,
    backgroundColor: "transparent",
    titleTextStyle: {
      color: theme.palette.mode === "dark" ? "#fff" : white ? "#fff" : "#333",
    },
    baselineColor: white ? "#fff" : white ? "#fff" : "#333",
    legend: noLegends
      ? { position: "none" }
      : {
          position: "bottom",
          textStyle: {
            color:
              theme.palette.mode === "dark" ? "#fff" : white ? "#fff" : "#333",
          },
          pagingTextStyle: { color: white ? "#fff" : white ? "#fff" : "grey" },
          scrollArrows: {
            inactiveColor: theme.palette.mode === "dark" ? "grey" : "lightGrey",
            activeColor: theme.palette.mode === "dark" ? "lightGrey" : "grey",
          },
        },

    hAxis: {
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : white ? "#fff" : "#333",
      },
    },
    vAxis: {
      textStyle: {
        color: theme.palette.mode === "dark" ? "#fff" : white ? "#fff" : "#333",
      },
    },
  };

  return (
    <Chart
      className="googleChart"
      chartType="ColumnChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
