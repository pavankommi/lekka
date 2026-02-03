"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { createBrowserClient } from "@/lib/pocketbase-client";

export function SyncAuth() {
  useEffect(() => {
    const pb = createBrowserClient();

    // Read auth cookie and load into client-side authStore
    const authCookie = Cookies.get("pb_auth");

    if (authCookie) {
      try {
        const authData = JSON.parse(authCookie);
        pb.authStore.save(authData.token, authData.record);
      } catch (error) {
        console.error("Failed to sync auth:", error);
      }
    }
  }, []);

  return null;
}
