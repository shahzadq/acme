"use client";

import { useMemo } from "react";

import { useTodosStore } from "@/stores/todos";

export const useTodosStoreListNames = () => {
  const lists = useTodosStore((state) => state.listed);

  const listsNames = useMemo(() => lists.map(({ name }) => name), [lists]);

  return listsNames;
};
