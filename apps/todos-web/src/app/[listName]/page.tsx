"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { fetchTodosByListId } from "@/actions/todos";
import { Todos, TodosProps } from "@/components/Todos";
import { addTodos, useTodosStore } from "@/stores/todos";

export default function ListPage({ params }: { params: { listName: string } }) {
  const { lists, unlisted } = useTodosStore();

  const list = useMemo(() => {
    if (params.listName.toLowerCase() === "unlisted") {
      return { id: undefined, name: "Unlisted", todos: unlisted };
    }
    return lists.find(
      ({ name }) => name.toUpperCase() === params.listName.toUpperCase(),
    );
  }, [lists, unlisted]);

  if (typeof list === "undefined") notFound();

  const [todos, setTodos] = useState<TodosProps["todos"]>(
    typeof list.todos === "undefined" ? "loading" : list.todos,
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchTodosByListId({ listId: list.id });
      if (result.type === "Error") setTodos("error");
      else {
        setTodos(result.content);
        addTodos(...result.content);
      }
    };

    if (todos === "loading") fetch();
  }, [todos]);

  return (
    <>
      <h1>List Page</h1>
      <Todos todos={todos} />
    </>
  );
}
