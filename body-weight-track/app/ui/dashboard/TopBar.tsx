import { signOut } from "@/auth";
import { Button } from "@mui/material";

export default function TopBar() {
  return (
    <div className="min-w-full bg-blue-500 flex justify-center">
      <h1 className="text-5xl ">Dashboard</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
