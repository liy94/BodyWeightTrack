"use client";

import { login } from "@/app/lib/hongfeiActions";
import LoginToken from "@/app/lib/LoginToken";
import { Button } from "@mui/material";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = () => {
    const tokenPromise = login(email, password);

    const onSuccess = (token: string) => {
      LoginToken.save(token);
    };

    const onFailure = () => {
      LoginToken.remove();
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
    </div>
  );
}
