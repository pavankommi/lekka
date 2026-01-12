"use client";

import { subMonths, addMonths, format, isSameMonth, startOfMonth } from "date-fns";
import { parseAsIsoDateTime, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExpenseForm } from "./expense-form";
import { ExpenseList } from "./expense-list";
import { useExpenses } from "./hooks";
import { formatCurrency } from "@/lib/currency";

export function DashboardContent() {
  const [currentDate, setCurrentDate] = useQueryState(
    "date",
    parseAsIsoDateTime.withDefault(startOfMonth(new Date()))
  );

  const { data: expenses = [] } = useExpenses(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthName = format(currentDate, "MMMM yyyy");
  const isCurrentMonth = isSameMonth(currentDate, new Date());

  const goToPrevMonth = () => setCurrentDate(startOfMonth(subMonths(currentDate, 1)));
  const goToNextMonth = () => setCurrentDate(startOfMonth(addMonths(currentDate, 1)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900">{monthName}</h2>
        <button
          onClick={goToNextMonth}
          disabled={isCurrentMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-900"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center py-8">
        <p className="text-sm text-gray-500 mb-2">Total this month</p>
        <p className="text-5xl font-bold text-gray-900">{formatCurrency(total)}</p>
      </div>

      <div className="space-y-4">
        <ExpenseForm />
      </div>

      <ExpenseList year={currentDate.getFullYear()} month={currentDate.getMonth()} />
    </div>
  );
}
