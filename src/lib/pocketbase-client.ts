import PocketBase from "pocketbase";
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_POCKETBASE_URL: z.string().url(),
});

const env = envSchema.parse({
  NEXT_PUBLIC_POCKETBASE_URL: process.env.NEXT_PUBLIC_POCKETBASE_URL,
});

export const PB_URL = env.NEXT_PUBLIC_POCKETBASE_URL;

export function createBrowserClient() {
  return new PocketBase(PB_URL);
}
