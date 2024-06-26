import { fetchWeight } from "@/app/lib/data";
import WeightChart from "../ui/dashboard/weightChart";
import { Weight } from "../lib/definitions";

export default async function Page() {
  const weights = await fetchWeight();
  console.log(weights);
  return (
    <div className="flex flex-col items-center">
      <WeightChart weights={weights} />
      <form action="">hey</form>
    </div>
  );
}
