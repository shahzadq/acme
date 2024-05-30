"use client";

import { useMemo } from "react";

import { useTodosStore } from "@/stores/todos";

export const useListsNames = () => {
  const lists = useTodosStore((state) => state.lists);

  const listsNames = useMemo(() => lists.map(({ name }) => name), [lists]);

  return listsNames;
};
