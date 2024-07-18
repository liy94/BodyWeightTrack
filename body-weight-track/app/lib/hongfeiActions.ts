"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET as string;

export async function createWeight(weight: number, date: Date) {
  const id = "410544b2-4001-4271-9855-fec4b6a6442a";
  await sql`
  INSERT INTO weights (user_id, weight, date)
  VALUES (${id}, ${weight}, ${date.toISOString()})`;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function login(email: string, password: string): Promise<string> {
  const result =
    await sql`SELECT email, password FROM users WHERE email=${email}`;

  const rowsCount = result.rowCount;
  if (rowsCount == 0) {
    throw new Error("no user found");
  }

  const user = result.rows[0];

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect Password");
  }

  return jwt.sign({ email }, AUTH_SECRET, { expiresIn: "6h" });
}
