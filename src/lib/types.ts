import type { RecordModel } from "pocketbase";

export interface ExpenseFields {
  user: string;
  description: string;
  amount: number;
  expenseDate: string;
  created: string;
}

export interface Expense extends RecordModel, ExpenseFields {}
