"use client";

import { subMonths, addMonths, format, isSameMonth, startOfMonth, setDate, getDate, endOfMonth } from "date-fns";
import { parseAsIsoDateTime, parseAsStringLiteral, useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { sumBy } from "lodash";
import { ExpenseForm } from "./expense-form";
import { ExpenseList } from "./expense-list";
import { useExpenses } from "./hooks";
import { formatCurrency } from "@/lib/currency";
import { useState } from "react";

export function DashboardContent() {
  const [currentDate, setCurrentDate] = useQueryState(
    "date",
    parseAsIsoDateTime.withDefault(startOfMonth(new Date()))
  );

  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringLiteral(["date", "amount"] as const).withDefault("date")
  );

  const [hideDescriptions, setHideDescriptions] = useState(false);

  const { data: expenses = [] } = useExpenses(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    sortBy
  );

  const total = sumBy(expenses, "amount");

  const monthName = format(currentDate, "MMMM yyyy");
  const isCurrentMonth = isSameMonth(currentDate, new Date());

  const todayDay = getDate(new Date());
  const lastDayOfTargetMonth = getDate(endOfMonth(currentDate));
  const safeDayOfMonth = Math.min(todayDay, lastDayOfTargetMonth);
  const defaultFormDate = setDate(currentDate, safeDayOfMonth);

  const goToPrevMonth = () => setCurrentDate(startOfMonth(subMonths(currentDate, 1)));
  const goToNextMonth = () => setCurrentDate(startOfMonth(addMonths(currentDate, 1)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          aria-label="Previous month"
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-medium text-gray-900">{monthName}</h2>
        <button
          onClick={goToNextMonth}
          disabled={isCurrentMonth}
          aria-label="Next month"
          className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-900"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-gray-500 mb-1">Total this month</p>
        <p className="text-3xl font-bold text-gray-900">{formatCurrency(total)}</p>
      </div>

      <div className="space-y-4">
        <ExpenseForm defaultDate={defaultFormDate} />
      </div>

      <div className="flex justify-end gap-3 text-xs items-center">
        <span className="text-gray-400">sort:</span>
        <button
          onClick={() => setSortBy("date")}
          className={`transition-colors ${
            sortBy === "date"
              ? "text-gray-900 underline"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Date
        </button>
        <button
          onClick={() => setSortBy("amount")}
          className={`transition-colors ${
            sortBy === "amount"
              ? "text-gray-900 underline"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Amount
        </button>
        <button
          onClick={() => setHideDescriptions(!hideDescriptions)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          aria-label={hideDescriptions ? "Show descriptions" : "Hide descriptions"}
        >
          {hideDescriptions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <ExpenseList
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        sortBy={sortBy}
        hideDescriptions={hideDescriptions}
      />
    </div>
  );
}
