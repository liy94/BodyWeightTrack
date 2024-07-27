import LogOutButton from "./LogOutButton";
import { cookies } from "next/headers";

export default function TopBar() {
  // const cookieStore = cookies();
  // const userName=
  return (
    <div className="min-w-full flex justify-between">
      <h1 className="text-5xl ">Dashboard</h1>
      <LogOutButton />
    </div>
  );
}
