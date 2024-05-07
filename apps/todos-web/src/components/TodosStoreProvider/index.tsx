import { db } from "@workspace/db-todos";

import { TodosStoreClientProvider } from "./Client";

export const TodosStoreProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const lists = await db.query.listTable.findMany();

  return (
    <TodosStoreClientProvider lists={lists}>
      {children}
    </TodosStoreClientProvider>
  );
};
