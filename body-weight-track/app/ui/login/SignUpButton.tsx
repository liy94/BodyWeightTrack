import Link from "next/link";
import { Button } from "@mui/material";

export default function SignUpButton() {
  return (
    <Link key="SignUp" href="/login/signup">
      <Button>Sign Up</Button>
    </Link>
  );
}
