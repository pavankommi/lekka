import { z } from "zod";

export const expenseSchema = z.object({
  description: z.string().min(1, "Description is required").max(100, "Description must be 100 characters or less"),
  amount: z.coerce.number().pipe(z.number().min(0.01, "Amount must be greater than 0")),
  date: z.string().min(1, "Date is required"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
