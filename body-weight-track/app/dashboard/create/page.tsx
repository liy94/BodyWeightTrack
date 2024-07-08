import CancelButton from "@/app/ui/dashboard/CancelButton";
import { createWeight } from "@/app/lib/actions";

export default function Page() {
  return (
    <form action={createWeight} className="flex flex-col items-center">
      <input
        id="WeightInput"
        name="WeightInput"
        type="number"
        placeholder="Enter weight in kg"
        required
        min="0"
      />
      <input type="date" id="DateInput" name="DateInput" required />
      <div className="flex">
        <div className="p-2">
          <CancelButton />
        </div>
        <button type="submit" className="p-2">
          Confirm
        </button>
      </div>
    </form>
  );
}
