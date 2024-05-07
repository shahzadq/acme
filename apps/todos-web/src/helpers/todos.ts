import type { Todo } from "@workspace/db-todos/types";

export const addTodoToArray = (
  arr: Todo[] | undefined | string,
  todo: Todo,
) => {
  if (typeof arr === "undefined" || typeof arr === "string") return [todo];

  const match = arr.find(({ id }) => todo.id === id);

  if (typeof match !== "undefined") return arr;

  return [...arr, todo];
};
