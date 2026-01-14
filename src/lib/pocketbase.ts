"use server";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { PB_URL } from "./pocketbase-client";

export async function getServerPB() {
  const pb = new PocketBase(PB_URL);
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
  }

  return pb;
}

export async function getCurrentUser() {
  const pb = await getServerPB();
  return pb.authStore.record;
}
