"use server";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { PB_URL } from "@/lib/pocketbase-client";
import type { Expense } from "@/lib/types";

async function getServerPB() {
  const pb = new PocketBase(PB_URL);
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
  }

  return pb;
}

export async function getExpenses(year: number, month: number): Promise<Expense[]> {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    return [];
  }

  const startDate = new Date(year, month, 1).toISOString();
  const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

  const records = await pb.collection<Expense>("expenses").getFullList({
    sort: "-created",
    filter: `user = "${pb.authStore.record?.id}" && created >= "${startDate}" && created <= "${endDate}"`,
  });

  return records;
}

export async function addExpense(description: string, amount: number, date: string) {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    throw new Error("Not authenticated");
  }

  await pb.collection<Expense>("expenses").create({
    user: pb.authStore.record?.id,
    description,
    amount,
    created: new Date(date).toISOString(),
  });
}

export async function deleteExpense(id: string) {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    throw new Error("Not authenticated");
  }

  await pb.collection<Expense>("expenses").delete(id);
}
