"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Weight } from "./definitions";
import { USER_ID } from "./cookieConstants";
import { cookies } from "next/headers";

const AUTH_SECRET = process.env.AUTH_SECRET as string;

export async function createWeight(weight: number, date: Date) {
  const cookieStore = cookies();
  const userID = cookieStore.get(USER_ID)?.value;
  await sql`
  INSERT INTO weights (user_id, weight, date)
  VALUES (${userID}, ${weight}, ${date.toISOString()})`;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export type AuthResult = {
  token: string;
  userId: string;
};

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  const result =
    await sql`SELECT email, password, id FROM users WHERE email=${email}`;

  const rowsCount = result.rowCount;
  if (rowsCount == 0) {
    throw new Error("no user found");
  }

  const user = result.rows[0];

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect Password");
  }

  return {
    token: jwt.sign({ email }, AUTH_SECRET, { expiresIn: "6h" }),
    userId: user.id,
  };
}

export async function signUpUser(
  userName: string,
  email: string,
  password: string
) {
  try {
    const existingUser =
      await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if ((existingUser.rowCount ?? 0) > 0) {
      throw new Error("Email already in use");
    }

    const hashsedPassword = await bcrypt.hash(password, 10);
    await sql`
  INSERT INTO users (name, email, password)
  VALUES (${userName}, ${email}, ${hashsedPassword})`;
  } catch (error) {
    console.log("Error occured while creating user: ", error);
    throw error;
  }
}

export async function fetchWeightByUserID(userID: string): Promise<Weight[]> {
  const data =
    await sql<Weight>`SELECT * FROM weights WHERE user_id = ${userID} ORDER BY date DESC`;
  return data.rows;
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

export async function fetchWeightByID(id: string) {
  try {
    const data = await sql<Weight>`SELECT * FROM weights WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch weight by ID.");
  }
}
