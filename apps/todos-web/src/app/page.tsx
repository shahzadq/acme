import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

export default async function HomePage() {
  const todos = await db.query.todoTable.findMany({ with: { list: true } });

  return (
    <>
      <h1>All</h1>
      <Todos todos={todos} />
    </>
  );
}
