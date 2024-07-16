"use client";

import { Button } from "@mui/material";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      await authenticate(undefined, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col items-center">
      <div>
        <p>Email</p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          required
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          minLength={6}
          required
        />
      </div>
      <Button type="submit">Log In</Button>
    </form>
  );
}
