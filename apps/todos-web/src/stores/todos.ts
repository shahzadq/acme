import type { List, ListWithTodos, Todo } from "@workspace/db-todos/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ListMaybeWithTodos = List & Partial<Pick<ListWithTodos, "todos">>;
interface Store {
  unlisted?: Todo[];
  lists?: Record<List["name"], Omit<ListMaybeWithTodos, "name">>;
}

export const useTodosStore = create(
  devtools(
    immer<Store>(() => ({ unlisted: undefined, lists: {} })),
    { name: "Todos", enabled: process.env.NODE_ENV === "development" },
  ),
);

export const setUnlistedTodos = (todos: Required<Store["unlisted"]>) =>
  useTodosStore.setState((draft) => {
    draft.unlisted = todos;
  });

export const setLists = (lists: List[]) =>
  useTodosStore.setState((draft) => {
    draft.lists = lists.reduce(
      (a, { name, id, createdAt, userId }) => (
        (a[name] = { id, createdAt, userId }), a
      ),
      {} as Exclude<typeof draft.lists, undefined>,
    );
  });

export const setList = ({
  name,
  id,
  userId,
  createdAt,
  todos,
}: ListMaybeWithTodos) =>
  useTodosStore.setState((draft) => {
    if (typeof draft.lists !== "undefined")
      draft.lists[name] = { id, userId, createdAt, todos };
  });
