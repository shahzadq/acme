"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";

import { Todos } from "@/components/Todos";
import { useTodosStore } from "@/stores/todos";

export default function ListTodosPage({
  params,
}: {
  params: { listName: string };
}) {
  const { unlisted, listed } = useTodosStore();

  const list = useMemo(() => {
    if (params.listName.toLowerCase() === "unlisted")
      return { name: "Unlisted", todos: unlisted };

    const list = listed.find(
      ({ name }) => name.toLowerCase() === params.listName.toLowerCase(),
    );

    if (typeof list === "undefined") return undefined;

    return { name: list.name, todos: list.todos };
  }, [unlisted, listed, params.listName]);

  if (typeof list === "undefined") notFound();

  return (
    <>
      <h1>{list.name} Todo's</h1>
      <Todos todos={list.todos} />
    </>
  );
}
