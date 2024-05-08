import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

export default async function HomePage() {
  const todos = await db.query.todoTable.findMany({ with: { list: true } });

  return <Todos title="All" todos={todos} />;
}
