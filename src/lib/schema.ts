import { z } from "zod";

export const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().min(1, "Date is required"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
