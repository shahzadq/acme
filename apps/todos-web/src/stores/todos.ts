import type { List, ListWithTodos, Todo } from "@workspace/db-todos/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
  unlisted?: Todo[];
  lists: Record<List["name"], Omit<ListWithTodos, "name"> | undefined>;
}

export const useTodosStore = create(
  immer<Store>(() => ({ unlisted: undefined, lists: {} })),
);

export const setUnlistedTodos = (todos: Required<Store["unlisted"]>) =>
  useTodosStore.setState((draft) => {
    draft.unlisted = todos;
  });
