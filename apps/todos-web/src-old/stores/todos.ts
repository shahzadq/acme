import type { List } from "@workspace/db-todos/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
  lists: List[];
}

export const useTodosStore = create(immer<Store>(() => ({ lists: [] })));

export const setLists = (lists: Store["lists"]) =>
  useTodosStore.setState((draft) => {
    draft.lists = lists;
  });

export const addList = (list: List) =>
  useTodosStore.setState((draft) => {
    draft.lists = [...draft.lists, list];
  });
