import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="text-red-500 md:text-green-500 lg:text-blue-500">Welcome</p>
      <Image
        src="/food.jpeg"
        width={640}
        height={853}
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
        <p>Get Started</p>
      </Link>
    </div>
  );
}
