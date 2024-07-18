import { Button } from "@mui/material";
import LogOutButton from "./LogOutButton";

export default function TopBar() {
  return (
    <div className="min-w-full flex justify-between">
      <h1 className="text-5xl ">Dashboard</h1>
      <LogOutButton />
    </div>
  );
}
