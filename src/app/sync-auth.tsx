"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@/lib/pocketbase-client";

export function SyncAuth() {
  useEffect(() => {
    const pb = createBrowserClient();

    // Read auth cookie and load into client-side authStore
    const cookies = document.cookie.split('; ');
    const authCookie = cookies.find(c => c.startsWith('pb_auth='));

    if (authCookie) {
      try {
        const value = decodeURIComponent(authCookie.split('=')[1]);
        const authData = JSON.parse(value);
        pb.authStore.save(authData.token, authData.record);
      } catch (error) {
        console.error("Failed to sync auth:", error);
      }
    }
  }, []);

  return null;
}
