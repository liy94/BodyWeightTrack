"use server";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function createWeight(formData: FormData) {
  //TODO: replace this hardcoded id with different user ids.
  const userId = "410544b2-4001-4271-9855-fec4b6a6442a";

  const rawFormData = {
    weight: formData.get("WeightInput"),
    date: formData.get("DateInput"),
  };

  if (rawFormData.weight === null) {
    throw new Error("Weight Input missing");
  }
  if (rawFormData.date === null) {
    throw new Error("Date Input missing");
  }

  const weight = parseFloat(rawFormData.weight.toString());
  if (isNaN(weight) || weight < 0) {
    throw new Error("Invalid weight");
  }

  const date = rawFormData.date.toString();

  await sql`
    INSERT INTO weights (user_id, weight, date)
    VALUES (${userId}, ${weight}, ${date})`;

  redirect("/dashboard");
}
