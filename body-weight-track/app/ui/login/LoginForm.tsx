"use client";

import { AuthResult, login } from "@/app/lib/actions";
import LoginToken, { UserIDCookie } from "@/app/lib/LoginToken";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignUpButton from "./SignUpButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLoginClick = () => {
    setLoading(true);
    const tokenPromise = login(email.toLowerCase(), password);

    const onSuccess = ({ token, userId }: AuthResult) => {
      LoginToken.save(token);
      UserIDCookie.save(userId);
      router.push("/dashboard");
    };

    const onFailure = () => {
      setLoading(false);
      LoginToken.remove();
      UserIDCookie.remove();
    };

    tokenPromise.then(onSuccess, onFailure);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onLoginClick();
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <TextField
        required
        label="Email"
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        value={email}
        onChange={(event) => setEmail(event.target.value.toString())}
        onKeyDown={handleKeyDown}
      />
      <TextField
        required
        label="Password"
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value.toString());
        }}
        onKeyDown={handleKeyDown}
      />
      <div className="flex w-1/2 justify-between">
        <SignUpButton />
        <Button onClick={onLoginClick}>Login</Button>
      </div>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
