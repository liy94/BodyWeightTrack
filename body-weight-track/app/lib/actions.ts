"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
