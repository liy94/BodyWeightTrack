import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Weight } from "@/app/lib/definitions";

const WeightChart = ({ weights }: { weights: Weight[] }) => {
  return (
    <LineChart
      xAxis={[{ dataKey: "date" }]}
      series={[{ dataKey: "weight" }]}
      dataset={weights}
    />
  );
};

export default WeightChart;
