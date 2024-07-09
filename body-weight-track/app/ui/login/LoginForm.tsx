import { Button } from "@mui/material";
export default function LoginForm() {
  return (
    <form action="" className="flex flex-col items-center">
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
