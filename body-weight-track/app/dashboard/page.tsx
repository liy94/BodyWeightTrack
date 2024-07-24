import WeightChart from "../ui/dashboard/weightChart";
import CRUD from "../ui/dashboard/CRUD";
import { cookies } from "next/headers";
import { USER_ID } from "../lib/cookieConstants";
import { fetchWeightByUserID } from "../lib/hongfeiActions";

export default async function Page() {
  const cookieStore = cookies();
  const userID = cookieStore.get(USER_ID)?.value;

  if (userID == null) {
    throw new Error("Oh No! can't find userID on dashboard page");
  }

  const weights = await fetchWeightByUserID(userID);

  return (
    <div className="flex flex-col items-center">
      <WeightChart weights={weights} />
      <CRUD />
    </div>
  );
}
