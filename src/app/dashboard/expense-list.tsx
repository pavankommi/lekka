"use client";

import { format, parseISO } from "date-fns";
import { groupBy } from "lodash";
import { useExpenses, useDeleteExpense } from "./hooks";
import type { Expense } from "@/lib/types";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/currency";

function groupByDay(expenses: Expense[]) {
  return groupBy(expenses, (expense) => {
    const dateOnly = expense.expenseDate.substring(0, 10);
    return format(parseISO(dateOnly), "EEE, MMM d");
  });
}

export function ExpenseList({
  year,
  month,
  sortBy,
}: {
  year: number;
  month: number;
  sortBy: "date" | "amount";
}) {
  const { data: expenses = [], isLoading, error } = useExpenses(year, month, sortBy);
  const deleteMutation = useDeleteExpense();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete expense");
    }
  };

  if (isLoading) {
    return <p className="text-gray-500 text-center py-8">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center py-8">
        Failed to load expenses. Please try again.
      </p>
    );
  }

  if (expenses.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No expenses this month. Add one above!
      </p>
    );
  }

  if (sortBy === "amount") {
    return (
      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => {
          const dateOnly = expense.expenseDate.substring(0, 10);
          const dateLabel = format(parseISO(dateOnly), "MMM d");

          return (
            <div
              key={expense.id}
              onClick={() => handleDelete(expense.id)}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{expense.description}</p>
                <p className="text-xs text-gray-500">{dateLabel}</p>
              </div>
              <p className="text-base font-medium text-gray-900">{formatCurrency(expense.amount)}</p>
            </div>
          );
        })}
      </div>
    );
  }

  const grouped = groupByDay(expenses);

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, dayExpenses]) => (
        <div key={day}>
          <h3 className="text-xs font-medium text-gray-500 mb-1">{day}</h3>
          <div className="divide-y divide-gray-200">
            {dayExpenses.map((expense) => (
              <div
                key={expense.id}
                onClick={() => handleDelete(expense.id)}
                className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{expense.description}</p>
                </div>
                <p className="text-base font-medium text-gray-900">{formatCurrency(expense.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
