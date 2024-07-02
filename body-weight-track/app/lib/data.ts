import { sql } from "@vercel/postgres";
import { User, Weight } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

// Stops the following functions from caching.
noStore();

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
