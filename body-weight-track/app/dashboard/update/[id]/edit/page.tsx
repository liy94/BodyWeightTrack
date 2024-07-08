import { updateWeight } from "@/app/lib/actions";
import CancelButton from "@/app/ui/dashboard/CancelButton";
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const updateWithId = updateWeight.bind(null, id);

  return (
    <form action={updateWithId}>
      <input
        id="WeightInput"
        name="WeightInput"
        type="number"
        placeholder="Enter weight in kg"
        required
        min="0"
      />
      <input type="date" id="DateInput" name="DateInput" required />
      <CancelButton />
      <button type="submit">Confirm</button>
    </form>
  );
}
