import { db } from "@workspace/db-todos";

import { TodosStoreClientProvider } from "./Client";

export const TodosStoreProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const lists = (await db.query.listTable.findMany()).map((list) => ({
    ...list,
    todos: undefined,
  }));

  return (
    <TodosStoreClientProvider lists={lists}>
      {children}
    </TodosStoreClientProvider>
  );
};
