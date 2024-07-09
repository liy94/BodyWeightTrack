import { updateWeight } from "@/app/lib/actions";
import { fetchWeightByID } from "@/app/lib/data";
import CancelButton from "@/app/ui/dashboard/CancelButton";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const updateWithId = updateWeight.bind(null, id);
  const weight = await fetchWeightByID(id);

  return (
    <form action={updateWithId}>
      <input
        id="WeightInput"
        name="WeightInput"
        type="number"
        placeholder="Enter weight in kg"
        required
        min="0"
        defaultValue={weight.weight}
      />
      <input
        type="date"
        id="DateInput"
        name="DateInput"
        defaultValue={weight.date.toISOString().split("T")[0]}
        required
      />
      <CancelButton />
      <button type="submit">Confirm</button>
    </form>
  );
}
