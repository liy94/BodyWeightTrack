import CancelButton from "@/app/ui/dashboard/CancelButton";
import { fetchWeight } from "@/app/lib/data";
import WeightTable from "@/app/ui/dashboard/WeightTable";

export default async function Page() {
  const weights = await fetchWeight();

  return (
    <div>
      <WeightTable weights={weights} />
      <CancelButton />
    </div>
  );
}
