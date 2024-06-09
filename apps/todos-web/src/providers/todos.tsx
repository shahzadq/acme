"use client";

import type { List } from "@workspace/db-todos/types";
import { useLayoutEffect, useState } from "react";

import { Spinner } from "@workspace/web-ui/components/Spinner";

import { setLists } from "@/stores/todos";

export const TodosStoreProvider = ({
  lists,
  children,
}: {
  children: React.ReactNode;
  lists: List[];
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    setLists(lists);
    setIsLoaded(true);
  }, [lists]);

  if (!isLoaded)
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return <>{children}</>;
};
