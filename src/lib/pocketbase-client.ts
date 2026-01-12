import PocketBase from "pocketbase";

export const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL!;

export function createBrowserClient() {
  return new PocketBase(PB_URL);
}
