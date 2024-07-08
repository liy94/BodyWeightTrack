import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Image
        src="/food.jpeg"
        width={320}
        height={426}
        className="hidden md:block"
        alt="an image of food"
      />
      <Image
        src="/pig.jpeg"
        width={360}
        height={280}
        className="block md:hidden"
        alt="an image of pig"
      />
      <Link key="dashboard" href="/dashboard">
        <Button size="large">Get Started</Button>
      </Link>
    </div>
  );
}
