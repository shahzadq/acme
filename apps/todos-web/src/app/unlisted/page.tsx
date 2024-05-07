import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

export default async function UnlistedPage() {
  const todos = await db.query.todoTable.findMany({
    where: (todo, { isNull }) => isNull(todo.listId),
    with: {
      list: true,
    },
  });

  return (
    <>
      <h1>Unlisted</h1>
      <Todos todos={todos} />
    </>
  );
}
