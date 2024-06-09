"use client";

import { useMemo } from "react";

import { mapKeys } from "@workspace/utils/objects";

import { useTodosStore } from "@/stores/todos";

export const useListsNames = () => {
  const lists = useTodosStore();

  const listsNames = useMemo(
    () => mapKeys(lists, (name) => name).filter((i) => i !== "unlisted"),
    [lists],
  );

  return listsNames;
};
