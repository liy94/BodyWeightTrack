"use client";

import CancelButton from "@/app/ui/dashboard/CancelButton";
import { createWeight } from "@/app/lib/actions";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Page() {
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <input
        type="number"
        required
        min="0"
        value={weight}
        onChange={(event) => {
          setWeight(parseFloat(event.target.value));
        }}
      />
      <input
        type="date"
        required
        onChange={(event) => {
          setDate(new Date(event.target.value));
        }}
      />
      <CancelButton />
      <Button
        onClick={() => {
          createWeight(weight, date);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
