"use server";

import { getServerPB } from "@/lib/pocketbase";
import type { Expense } from "@/lib/types";
import { expenseSchema } from "@/lib/schema";
import { format, addMonths } from "date-fns";

export async function getExpenses(
  year: number,
  month: number,
  sortBy: "date" | "amount" = "date"
): Promise<Expense[]> {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    return [];
  }

  // Use date-fns for cleaner date formatting
  const startDate = format(new Date(year, month, 1), "yyyy-MM-dd");
  const nextMonthDate = addMonths(new Date(year, month, 1), 1);
  const nextMonthStr = format(nextMonthDate, "yyyy-MM-dd");

  const sortField = sortBy === "date" ? "-expenseDate" : "-amount";

  const records = await pb.collection<Expense>("expenses").getFullList({
    sort: sortField,
    filter: `user = "${pb.authStore.record?.id}" && expenseDate >= "${startDate}" && expenseDate < "${nextMonthStr}"`,
  });

  return records;
}

export async function addExpense(description: string, amount: number, date: string) {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    throw new Error("Not authenticated");
  }

  // Server-side validation
  const validated = expenseSchema.parse({ description, amount, date });

  await pb.collection<Expense>("expenses").create({
    user: pb.authStore.record?.id,
    description: validated.description,
    amount: validated.amount,
    expenseDate: validated.date + "T00:00:00.000Z",
  });
}

export async function deleteExpense(id: string) {
  const pb = await getServerPB();

  if (!pb.authStore.isValid) {
    throw new Error("Not authenticated");
  }

  // Verify ownership before deleting
  const expense = await pb.collection<Expense>("expenses").getOne(id);

  if (expense.user !== pb.authStore.record?.id) {
    throw new Error("Unauthorized: Cannot delete expense owned by another user");
  }

  await pb.collection<Expense>("expenses").delete(id);
}
