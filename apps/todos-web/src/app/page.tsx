"use client";

import type { TodosProps } from "@/components/Todos";
import { useEffect, useState } from "react";

import { fetchTodosByListId } from "@/actions/todos";
import { Todos } from "@/components/Todos";
import { addTodoToArray } from "@/helpers/todos";
import { addTodos, useTodosStore } from "@/stores/todos";

export default function HomePage() {
  const { lists, unlisted } = useTodosStore();

  const [error, setError] = useState(false);
  const [todos, setTodos] =
    useState<Exclude<TodosProps["todos"], "error">>("loading");

  useEffect(() => {
    const fetch = async (
      listId?: Parameters<typeof fetchTodosByListId>[0]["listId"],
    ) => {
      if (!error) {
        const result = await fetchTodosByListId({ listId });
        if (result.type === "Error") setError(true);
        else {
          result.content.map((todo) => {
            setTodos((draft) => addTodoToArray(draft, todo));
          });
          addTodos(...result.content);
        }
      }
    };

    if (typeof unlisted === "undefined") fetch().catch(() => ({}));
    lists.forEach((list) => {
      if (typeof list.todos === "undefined") fetch(list.id).catch(() => ({}));
    });
  }, [lists, unlisted, error]);

  return (
    <>
      <h1>Home Page</h1>
      <Todos todos={error ? "error" : todos} />
    </>
  );
}
