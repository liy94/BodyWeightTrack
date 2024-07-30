"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import { useState } from "react";
import CreateDialog from "./CreateDialog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CRUD() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-start">
        <Link key="Create" href="/dashboard/create">
          <Button>Create New Weight</Button>
        </Link>
        <Link key="Update" href="/dashboard/update">
          <Button>Update Existing Weight</Button>
        </Link>

        <Button
          onClick={() => {
            setCreateDialogOpen(true);
          }}
        >
          Create
        </Button>
        <CreateDialog
          open={createDialogOpen}
          onClose={handleCreateDialogClose}
        />
      </div>
    </LocalizationProvider>
  );
}
