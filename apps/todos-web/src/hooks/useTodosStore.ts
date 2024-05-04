"use client";

import { todosStore } from "@/stores/todos";

// In zustand cant have an array as the root type so use this workaround

export const useTodosStore = () => {
  const store = todosStore((state) => state.todos);
  return store;
};
