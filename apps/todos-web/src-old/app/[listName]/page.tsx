import type { List } from "@workspace/db-todos/types";
import { notFound } from "next/navigation";

import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

const extractList = <O extends List>({ id, createdAt, name }: O) => ({
  id,
  name,
  createdAt,
});

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
        list: extractList(list),
      }))}
    />
  );
}
