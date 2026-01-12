"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { groupBy } from "lodash";
import { useExpenses, useDeleteExpense } from "./hooks";
import type { Expense } from "@/lib/types";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/currency";

function groupByDay(expenses: Expense[]) {
  return groupBy(expenses, (expense) =>
    format(new Date(expense.created), "EEE, MMM d")
  );
}

export function ExpenseList({ year, month }: { year: number; month: number }) {
  const { data: expenses = [], isLoading } = useExpenses(year, month);
  const deleteMutation = useDeleteExpense();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Expense deleted");
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  if (isLoading) {
    return <p className="text-gray-500 text-center py-8">Loading...</p>;
  }

  if (expenses.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No expenses this month. Add one above!
      </p>
    );
  }

  const grouped = groupByDay(expenses);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([day, dayExpenses]) => (
        <div key={day}>
          <h3 className="text-sm font-medium text-gray-500 mb-2">{day}</h3>
          <div className="space-y-2">
            {dayExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{expense.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    aria-label="Delete expense"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
