import { notFound } from "next/navigation";

import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

export default async function ListPage({
  params,
}: {
  params: { listName: string };
}) {
  const list = await db.query.listTable.findFirst({
    where: (list, { sql }) =>
      sql`upper(${list.name}) = upper(${params.listName})`,
    with: { todos: true },
  });

  if (typeof list === "undefined") notFound();

  return (
    <Todos
      title={list.name}
      listId={list.id}
      todos={list.todos.map((todo) => ({
        ...todo,
        list: { id: list.id, createdAt: list.createdAt, name: list.name },
      }))}
    />
  );
}
