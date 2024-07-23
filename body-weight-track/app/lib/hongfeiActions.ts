"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User } from "./definitions";

const AUTH_SECRET = process.env.AUTH_SECRET as string;

export async function createWeight(weight: number, date: Date) {
  const id = "410544b2-4001-4271-9855-fec4b6a6442a";
  await sql`
  INSERT INTO weights (user_id, weight, date)
  VALUES (${id}, ${weight}, ${date.toISOString()})`;

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
