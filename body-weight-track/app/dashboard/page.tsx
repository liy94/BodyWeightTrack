import { fetchWeight } from "@/app/lib/data";
import WeightChart from "../ui/dashboard/weightChart";
import CRUD from "../ui/dashboard/CRUD";

export default async function Page() {
  const weights = await fetchWeight();

  return (
    <div className="flex flex-col items-center">
      <WeightChart weights={weights} />
      <CRUD />
    </div>
  );
}
