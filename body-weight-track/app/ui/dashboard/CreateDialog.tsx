"use client";

import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

export interface createDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateDialog(props: createDialogProps) {
  const { open, onClose } = props;
  const [weight, setWeight] = useState<number>(0);
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const onDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const onWeightChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newVal = Math.max(0, parseInt(event.target.value));
    setWeight(newVal);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Log Your Weight</DialogTitle>
      <DialogContent>
        <TextField
          required
          label="Weight in kg"
          type="number"
          sx={{ mt: 1, mb: 1, width: 1 }}
          value={weight}
          onChange={onWeightChange}
        />
        <DatePicker
          label="Select Date"
          value={date}
          onChange={onDateChange}
          sx={{ mt: 1, mb: 1, width: 1 }}
        />
      </DialogContent>
    </Dialog>
  );
}
