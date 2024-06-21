import { sql } from "@vercel/postgres";
import { User, Weight } from "./definitions";

export async function fetchWeight() {
  try {
    const data = await sql<Weight>`SELECT * FROM weights`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch weight data.");
  }
}

export async function fetchUser() {
  try {
    const data = await sql<User>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}
