"use client";

import { createBrowserClient } from "@/lib/pocketbase-client";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "../actions";

export function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const pb = createBrowserClient();
    pb.authStore.clear();
    await clearAuthCookie();
    router.refresh();
    router.push("/");
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
    >
      Sign Out
    </button>
  );
}
