"use server";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { PB_URL } from "./pocketbase-client";

export async function getServerPB() {
  const pb = new PocketBase(PB_URL);
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (authCookie?.value) {
    try {
      const authData = JSON.parse(authCookie.value);
      pb.authStore.save(authData.token, authData.record);
    } catch (error) {
      console.error("[Server] Failed to parse auth cookie:", error);
    }
  }

  return pb;
}

export async function getCurrentUser() {
  const pb = await getServerPB();
  return pb.authStore.record;
}
