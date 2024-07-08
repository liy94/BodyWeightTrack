"use client";

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Weight } from "@/app/lib/definitions";

const WeightChart = ({ weights }: { weights: Weight[] }) => {
  const [dimentions, setDimensions] = useState({ width: 750, height: 400 });

  const updateDimensions = () => {
    const width = window.innerWidth < 600 ? window.innerWidth - 20 : 750;
    const height = window.innerWidth < 600 ? 300 : 400;
    setDimensions({ width, height });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <LineChart
      xAxis={[{ dataKey: "date", label: "Date", scaleType: "time" }]}
      series={[{ dataKey: "weight" }]}
      dataset={weights}
      width={dimentions.width}
      height={dimentions.height}
    />
  );
};

export default WeightChart;
