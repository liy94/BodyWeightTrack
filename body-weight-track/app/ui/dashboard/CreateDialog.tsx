"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import { createWeight } from "@/app/lib/actions";

export interface createDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateDialog(props: createDialogProps) {
  const { open, onClose } = props;
  const [weight, setWeight] = useState<number | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const onDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const onWeightChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newVal = Math.max(0, parseInt(event.target.value));
    setWeight(newVal);
  };

  const handleCancelButtonClick = () => {
    setWeight(null);
    setDate(null);
    onClose();
  };

  const handleSubmitButtonClick = () => {
    if (weight == null || date == null) {
      throw new Error("Oh No! Cannot have empty fields!");
    }
    createWeight(weight, date.toDate());

    setWeight(null);
    handleCancelButtonClick(); //clears data and closes dialog
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
          slotProps={{ textField: { required: true } }}
          label="Select Date"
          value={date}
          onChange={onDateChange}
          sx={{ mt: 1, mb: 1, width: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ pt: 0, pl: 3, pr: 3, pb: 1 }}>
        <Button onClick={handleCancelButtonClick}>Cancel</Button>
        <Button onClick={handleSubmitButtonClick}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
