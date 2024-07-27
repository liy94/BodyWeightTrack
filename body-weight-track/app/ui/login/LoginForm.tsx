"use client";

import { AuthResult, login } from "@/app/lib/hongfeiActions";
import LoginToken, { UserIDCookie } from "@/app/lib/LoginToken";
import { Button, TextField } from "@mui/material";
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
    <div className="flex flex-col min-h-screen justify-center items-center">
      <TextField
        required
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value.toString())}
      />
      <TextField
        required
        label="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value.toString());
        }}
      />
      <div>
        <Button onClick={onLoginClick}>Login</Button>
        <SignUpButton />
      </div>
    </div>
  );
}
