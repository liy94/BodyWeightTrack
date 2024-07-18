"use client";

import LoginToken, { UserIDCookie } from "@/app/lib/LoginToken";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const onLogoutClick = () => {
    UserIDCookie.remove();
    LoginToken.remove();

    router.push("/login");
  };

  return <Button onClick={onLogoutClick}>Logout</Button>;
}
