"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User, Weight } from "./definitions";
import { NextRequest } from "next/server";
import { LOGIN_TOKEN, USER_ID } from "./cookieConstants";
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

export async function getUserIDFromRequest(request: NextRequest) {
  return request.cookies.get(USER_ID);
}

export async function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get(LOGIN_TOKEN);
}
