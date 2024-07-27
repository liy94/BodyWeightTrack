import { USER_ID } from "@/app/lib/cookieConstants";
import LogOutButton from "./LogOutButton";
import { cookies } from "next/headers";
import { fetchUserByUserID, fetchUserIDFromCookie } from "@/app/lib/actions";

export default async function TopBar() {
  const userID = await fetchUserIDFromCookie();
  const user = await fetchUserByUserID(userID);
  const userName = user.name;

  return (
    <div className="min-w-full flex justify-between">
      <h1 className="text-5xl ">{userName}</h1>
      <LogOutButton />
    </div>
  );
}
