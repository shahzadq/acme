"use client";

import { useLayoutEffect } from "react";

import { setTodos } from "@/stores/todos";

type TodosStore = Parameters<typeof setTodos>[0];

export const TodosStoreClientProvider = ({
  todos,
  children,
}: {
  todos: TodosStore;
  children: React.ReactNode;
}) => {
  useLayoutEffect(() => {
    setTodos(todos);
  }, [todos]);

  return <>{children}</>;
};
