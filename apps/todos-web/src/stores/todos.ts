import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { List, Todo } from "@workspace/db-todos/schema";

type StoreList = List & { todos: Todo[] };
type StoreTodos = StoreList[];
type Store = { todos: StoreTodos };

export const todosStore = create(immer<Store>(() => ({ todos: [] })));

export const setTodos = (todos: StoreTodos) => todosStore.setState({ todos });

export const addList = (list: List) =>
  todosStore.setState((draft) => {
    draft.todos = [...draft.todos, { ...list, todos: [] }];
  });

export const addTodo = ({ listName, ...todo }: Todo & { listName: string }) =>
  todosStore.setState((draft) => {
    const list = draft.todos.find(
      (list) => list.name.toLowerCase() === listName.toLowerCase(),
    );

    if (typeof list !== "undefined") {
      list.todos = [...list.todos, todo];
    }
  });
