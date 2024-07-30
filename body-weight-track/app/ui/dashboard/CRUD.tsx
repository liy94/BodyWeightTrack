"use client";

import Link from "next/link";
import { Button, Fab } from "@mui/material";
import { useState } from "react";
import CreateDialog from "./CreateDialog";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export default function CRUD() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col">
        <Link key="Update" href="/dashboard/update">
          <Button>Update Existing Weight</Button>
        </Link>
        <Fab
          color="primary"
          onClick={() => setCreateDialogOpen(true)}
          className="bg-blue-500"
        >
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" className="bg-fuchsia-700">
          <EditIcon />
        </Fab>
        <CreateDialog
          open={createDialogOpen}
          onClose={handleCreateDialogClose}
        />
      </div>
    </LocalizationProvider>
  );
}
