import { db } from "@workspace/db-todos";

import { TodosStoreClientProvider } from "./Client";

export const TodosStoreProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const listed = await db.query.listTable.findMany({
    with: { todos: true },
  });
  const unlisted = await db.query.todoTable.findMany({
    where: (todo, { isNull }) => isNull(todo.listId),
  });

  return (
    <TodosStoreClientProvider todos={{ listed, unlisted }}>
      {children}
    </TodosStoreClientProvider>
  );
};
