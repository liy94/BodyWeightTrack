"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN_TOKEN, USER_ID } from "./app/lib/cookieConstants";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import { User } from "./app/lib/definitions";

const AUTH_SECRET = process.env.AUTH_SECRET as string;

async function genUserFromID(id: string) {
  const result = await sql`SELECT * FROM users WHERE id=${id}`;

  if (result.rowCount == 0) {
    return null;
  }

  return result.rows[0] as User;
}

async function genIsTokenValid(
  token: string | undefined,
  userId: string | undefined
): Promise<boolean> {
  if (token == null || userId == null) {
    return false;
  }

  const user = await genUserFromID(userId);

  if (user == null) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    console.log(decoded); //TODO: This is not properly console logged
  } catch (err) {
    console.log(err);
  }

  return true;
}

function redirectToRoute(request: NextRequest, route: string) {
  const url = request.nextUrl.clone();
  url.pathname = route;

  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(LOGIN_TOKEN);
  const userId = request.cookies.get(USER_ID);

  const path = request.nextUrl.pathname;

  const isTokenValid = await genIsTokenValid(token?.value, userId?.value);

  if (path.startsWith("/login") && isTokenValid) {
    return redirectToRoute(request, "/dashboard");
  }

  if (path.startsWith("/dashboard") && !isTokenValid) {
    return redirectToRoute(request, "/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
