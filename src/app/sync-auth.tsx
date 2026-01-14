"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@/lib/pocketbase-client";

export function SyncAuth() {
  useEffect(() => {
    const pb = createBrowserClient();
    pb.authStore.loadFromCookie(document.cookie);
  }, []);

  return null;
}
