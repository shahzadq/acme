"use client";

import { useMemo } from "react";

import { Todos } from "@/components/Todos";
import { useTodosStore } from "@/stores/todos";

export default function HomePage() {
  const todos = useTodosStore();

  const extractedTodos = useMemo(
    () => [
      ...todos.listed
        .map(({ todos }) => todos)
        .reduce((a, v) => [...a, ...v], []),
      ...todos.unlisted,
    ],
    [todos],
  );

  return (
    <>
      <h1>All Todo's</h1>
      <div>
        <Todos todos={extractedTodos} />
      </div>
    </>
  );
}
