import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { List, Todo } from "@workspace/db-todos/tables";

type StoreList = List & { todos: Todo[] };
type StoreTodos = StoreList[];
type Store = { unlisted: Todo[]; listed: StoreTodos };

export const useTodosStore = create(
  immer<Store>(() => ({ unlisted: [], listed: [] })),
);

export const setTodos = (todos: Store) => useTodosStore.setState(todos);

export const addList = (list: List) =>
  useTodosStore.setState((draft) => {
    draft.listed = [...draft.listed, { ...list, todos: [] }];
  });

export const addTodo = ({ listName, ...todo }: Todo & { listName?: string }) =>
  useTodosStore.setState((draft) => {
    if (typeof listName === "undefined") {
      draft.unlisted = [...draft.unlisted, todo];
    } else {
      const list = draft.listed.find(
        ({ name }) => name.toLowerCase() === listName.toLowerCase(),
      );

      if (typeof list !== "undefined") {
        list.todos = [...list.todos, todo];
      }
    }
  });
