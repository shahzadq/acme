import type { List, Todo } from "@workspace/db-todos/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Todos {
  todos?: Todo[];
}
type TodosStore = Record<string, Todos | (Omit<List, "name"> & Todos)>;

export const useTodosStore = create(
  devtools(
    immer<TodosStore>(() => ({ unlisted: {} })),
    {
      name: "Todos",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

export const setLists = (lists: List[]) =>
  useTodosStore.setState((draft) => {
    lists.map(({ name, ...list }) => {
      draft[name] = list;
    });
  });

export const setList = ({ name, ...list }: List) =>
  useTodosStore.setState((draft) => {
    draft[name] = list;
  });

export const deleteList = ({ name }: List) =>
  useTodosStore.setState((draft) => {
    delete draft[name];
  });
