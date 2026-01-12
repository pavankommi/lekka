import { z } from "zod";
import { parse, isValid } from "date-fns";

export const expenseSchema = z.object({
  description: z.string().min(1, "Description is required").max(100, "Description must be 100 characters or less"),
  amount: z.coerce.number().pipe(z.number().min(0.01, "Amount must be greater than 0")),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine(
      (dateStr) => isValid(parse(dateStr, "yyyy-MM-dd", new Date())),
      { message: "Invalid date" }
    ),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
