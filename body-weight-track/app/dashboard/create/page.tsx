import CancelButton from "@/app/ui/dashboard/CancelButton";
import { createWeight } from "@/app/lib/actions";

export default function Page() {
  return (
    <form action={createWeight}>
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
