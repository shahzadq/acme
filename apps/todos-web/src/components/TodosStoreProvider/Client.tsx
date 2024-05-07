"use client";

import type { List } from "@workspace/db-todos/types";
import { useLayoutEffect, useState } from "react";

import { setLists } from "@/stores/todos";

export const TodosStoreClientProvider = ({
  lists,
  children,
}: {
  lists: List[];
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setLists(lists);
    setIsLoading(false);
  }, [lists]);

  if (isLoading) return <div>loading...</div>;

  return <>{children}</>;
};
