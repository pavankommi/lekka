"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, addExpense, deleteExpense } from "./actions";

export function useExpenses(year: number, month: number) {
  return useQuery({
    queryKey: ["expenses", year, month],
    queryFn: () => getExpenses(year, month),
  });
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      description,
      amount,
      date,
    }: {
      description: string;
      amount: number;
      date: string;
    }) => addExpense(description, amount, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
