"use client";

import { useLayoutEffect } from "react";

import { List, Todo } from "@workspace/db-todos/schema";

import { setTodos } from "@/stores/todos";

export const WithTodosStore = ({
  todos,
  children,
}: {
  todos: (List & { todos: Todo[] })[];
  children: React.ReactNode;
}) => {
  useLayoutEffect(() => {
    setTodos(todos);
  }, [todos]);

  return <>{children}</>;
};
