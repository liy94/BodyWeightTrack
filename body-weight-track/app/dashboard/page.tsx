import { fetchWeight } from "@/app/lib/data";
import WeightChart from "../ui/dashboard/weightChart";
import { Weight } from "../lib/definitions";

export default async function Page() {
  const weights = await fetchWeight();
  console.log(weights);
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-full bg-blue-500 flex justify-center">
        <h1 className="text-5xl ">Dashboard</h1>
      </div>
      <WeightChart weights={weights} />
    </div>
  );
}
