"use client";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Weight } from "@/app/lib/definitions";

const WeightChart = ({ weights }: { weights: Weight[] }) => {
  return (
    <LineChart
      xAxis={[{ dataKey: "date" }]}
      series={[{ dataKey: "weight" }]}
      dataset={weights}
      width={500}
      height={300}
    />
  );
};

export default WeightChart;
