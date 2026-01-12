import type { RecordModel } from "pocketbase";

// Base expense fields (application data)
export interface ExpenseFields {
  user: string;
  description: string;
  amount: number;
  created: string;
}

// Complete expense type extending PocketBase RecordModel
export interface Expense extends RecordModel, ExpenseFields {}
