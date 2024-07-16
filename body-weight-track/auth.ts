import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

type Credentials = {
  email: string;
  password: string;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: unknown) {
        if (!credentials || typeof credentials !== "object") {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials as Credentials;

        // Manual validation
        if (typeof email !== "string" || !email.includes("@")) {
          throw new Error("Invalid email format");
        }
        if (typeof password !== "string" || password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }
        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
