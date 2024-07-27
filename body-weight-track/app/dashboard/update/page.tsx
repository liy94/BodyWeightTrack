import CancelButton from "@/app/ui/dashboard/CancelButton";
import WeightTable from "@/app/ui/dashboard/WeightTable";
import { cookies } from "next/headers";
import { USER_ID } from "@/app/lib/cookieConstants";
import { fetchWeightByUserID } from "@/app/lib/actions";

export default async function Page() {
  const cookieStore = cookies();
  const userID = cookieStore.get(USER_ID)?.value;

  if (userID == null) {
    throw new Error("Oh No! Cannot find userID for update page!");
  }

  const weights = await fetchWeightByUserID(userID);

  return (
    <div>
      <WeightTable weights={weights} />
      <CancelButton />
    </div>
  );
}
