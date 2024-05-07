"use client";

import { useLayoutEffect, useState } from "react";

import { setTodosStore } from "@/stores/todos";

type StoreLists = Parameters<typeof setTodosStore>[0]["lists"];

export const TodosStoreClientProvider = ({
  lists,
  children,
}: {
  lists: StoreLists;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTodosStore({ lists, unlisted: undefined });
    setIsLoading(false);
  }, [lists]);

  if (isLoading) return <div>loading...</div>;

  return <>{children}</>;
};
