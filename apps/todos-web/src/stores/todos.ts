import type { List, Todo } from "@workspace/db-todos/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { addTodoToArray } from "@/helpers/todos";

interface Store {
  unlisted: Todo[] | undefined;
  lists: (List & { todos: Todo[] | undefined })[];
}

export const useTodosStore = create(
  immer<Store>(() => ({ unlisted: undefined, lists: [] })),
);

export const setTodosStore = (state: Store) => useTodosStore.setState(state);

export const addListToStore = (list: List) =>
  useTodosStore.setState((draft) => {
    draft.lists = [...draft.lists, { ...list, todos: [] }];
  });

export const addTodos = (...todos: Todo[]) =>
  todos.forEach((todo) => {
    useTodosStore.setState((draft) => {
      if (typeof todo.listId === "undefined")
        draft.unlisted = addTodoToArray(draft.unlisted, todo);
      else {
        const list = draft.lists.find(({ id }) => id === todo.listId);

        if (typeof list !== "undefined")
          list.todos = addTodoToArray(list.todos, todo);
      }
    });
  });
