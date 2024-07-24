"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateWeight(id: string, formData: FormData) {
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
  UPDATE weights
  SET weight = ${weight}, date = ${date}
  WHERE id = ${id}`;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteWeight(id: string) {
  await sql`DELETE FROM weights WHERE id=${id}`;
  revalidatePath("/dashboard");
}
