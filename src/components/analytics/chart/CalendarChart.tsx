import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "date", id: "Date" },
    { type: "number", id: "Won/Loss" },
  ],
  [new Date(2013, 2, 4), 2],
  [new Date(2013, 1, 4), 1],
  [new Date(2013, 3, 4), 5],
];

export const options = {
  title: "Poll Interactions this Year",
};

export function CalendarChart() {
  return (
    <Chart
      className="googleChart"
      chartType="Calendar"
      data={data}
      options={options}
    />
  );
}
