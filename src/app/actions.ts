"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(authData: { token: string; record: any }) {
  const cookieStore = await cookies();
  cookieStore.set("pb_auth", JSON.stringify(authData), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("pb_auth");
}
