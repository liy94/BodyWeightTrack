import Link from "next/link";
import { Button } from "@mui/material";
export default function CRUD() {
  return (
    <div className="flex flex-col items-start">
      <Link key="Create" href="/dashboard/create">
        <Button>Create New Weight</Button>
      </Link>
      <Link key="Update" href="/dashboard/update">
        <Button>Update Existing Weight</Button>
      </Link>
    </div>
  );
}
