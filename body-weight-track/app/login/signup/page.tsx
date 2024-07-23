"use client";

import Button from "@mui/material/Button";
import { useState } from "react";
import { signUpUser } from "@/app/lib/hongfeiActions";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSignUpClick = () => {
    if (userName == "") {
      setErrorMessage("Username required");
      return;
    } else if (email == "") {
      setErrorMessage("Email required");
      return;
    } else if (password.length < 6) {
      setErrorMessage("Password needs to be at leat 6 letters");
      return;
    }

    setErrorMessage("");
    const result = signUpUser(userName, email, password);

    const onSuccess = () => {
      router.push("/login");
    };

    const onFailure = (error: Error) => {
      setErrorMessage(error.message);
    };
    result.then(onSuccess).catch(onFailure);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter User Name"
        value={userName}
        required
        onChange={(event) => setUserName(event.target.value.toString())}
      />
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
        minLength={6}
        onChange={(event) => setPassword(event.target.value.toString())}
      />
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <Button onClick={onSignUpClick}>Submit</Button>
    </div>
  );
}
