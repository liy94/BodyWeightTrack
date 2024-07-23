"use client";

import { AuthResult, login } from "@/app/lib/hongfeiActions";
import LoginToken, { UserIDCookie } from "@/app/lib/LoginToken";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpButton from "./SignUpButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginClick = () => {
    const tokenPromise = login(email, password);

    const onSuccess = ({ token, userId }: AuthResult) => {
      LoginToken.save(token);
      UserIDCookie.save(userId);

      router.push("/dashboard");
    };

    const onFailure = () => {
      LoginToken.remove();
      UserIDCookie.remove();
    };

    tokenPromise.then(onSuccess, onFailure);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        required
        onChange={(event) => setEmail(event.target.value.toString())}
      />
      <input
        type="password"
        placeholder="Enter Password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value.toString())}
      />
      <Button onClick={onLoginClick}>Login</Button>
      <SignUpButton />
    </div>
  );
}
