import { db } from "@workspace/db-todos";

import { Todos } from "@/components/Todos";

export default async function HomePage() {
  const list = await db.query.listSchema.findFirst({
    where: (list, { eq }) => eq(list.isCustom, false),
    with: {
      todos: true,
    },
  });

  return (
    <>
      <h1>Unlisted Todo's</h1>
      <div>
        {typeof list === "undefined" ? (
          <div>Something went wrong when creating your account.</div>
        ) : (
          <Todos todos={list.todos} />
        )}
      </div>
    </>
  );
}
