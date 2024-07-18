import { fetchWeight } from "@/app/lib/data";
import WeightChart from "../ui/dashboard/weightChart";
import CRUD from "../ui/dashboard/CRUD";
import { redirect } from "next/navigation";
import LoginToken from "../lib/LoginToken";

export default async function Page() {
  if (!LoginToken.isUserLoggedIn) {
    redirect("/login");
  }

  const weights = await fetchWeight();

  return (
    <div className="flex flex-col items-center">
      <WeightChart weights={weights} />
      <CRUD />
    </div>
  );
}
