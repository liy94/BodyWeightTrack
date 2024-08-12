"use client";

import Button from "@mui/material/Button";
import { useState } from "react";
import { signUpUser } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Alert, Backdrop, CircularProgress, TextField } from "@mui/material";

export default function Page() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignUpClick = () => {
    setLoading(true);

    if (userName == "") {
      setErrorMessage("Username required");
      setLoading(false);
      return;
    } else if (email == "") {
      setErrorMessage("Email required");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setErrorMessage("Password needs to be at leat 6 letters");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Different passwords? Did you type it right?");
      setLoading(false);
      return;
    }

    setErrorMessage("");
    const result = signUpUser(userName, email.toLowerCase(), password);

    const onSuccess = () => {
      router.push("/login");
    };

    const onFailure = (error: Error) => {
      setErrorMessage(error.message);
    };
    result
      .then(onSuccess)
      .catch(onFailure)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <TextField
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        required
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value.toString())}
      />
      <TextField
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        required
        label="User Name"
        value={userName}
        onChange={(event) => setUserName(event.target.value.toString())}
      />
      <TextField
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        required
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value.toString())}
      />
      <TextField
        sx={{ mt: 0.7, mb: 0.7, width: 1 / 2 }}
        required
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value.toString())}
      />
      <div className="flex w-1/2 justify-between">
        <Button onClick={() => router.push("/login")}>Cancel</Button>
        <Button onClick={onSignUpClick}>Submit</Button>
      </div>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {errorMessage && (
        <Alert sx={{ mt: 2, width: 1 / 2 }} severity="error">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
