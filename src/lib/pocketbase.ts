"use server";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { PB_URL } from "./pocketbase-client";

export async function getServerPB() {
  const pb = new PocketBase(PB_URL);
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  console.log("[Server] Has cookie:", !!authCookie);
  console.log("[Server] Cookie value length:", authCookie?.value?.length);

  if (authCookie?.value) {
    try {
      console.log("[Server] Raw cookie value:", authCookie.value.substring(0, 100));
      const authData = JSON.parse(authCookie.value);
      console.log("[Server] Parsed token exists:", !!authData.token);
      pb.authStore.save(authData.token, authData.record);
      console.log("[Server] Auth is valid:", pb.authStore.isValid);
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
