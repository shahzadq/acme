"use server";

import type { InsertTodo, Todo } from "@workspace/db-todos/types";

import { db, eq } from "@workspace/db-todos";
import { todoTable } from "@workspace/db-todos/tables";

import {
  CREATE_TODO_MESSAGES,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from "@/constants/actions";
import { createAction } from "./_internals";

export const createTodo = createAction(async (params: InsertTodo) => {
  try {
    await db.insert(todoTable).values(params);
    const todo = await db.query.todoTable.findFirst({
      where: (todo, { eq }) => eq(todo.description, params.description),
      with: { list: true },
    });

    if (typeof todo === "undefined")
      throw new Error("Something went wrong creating the todo.");

    return {
      type: "Success",
      message: CREATE_TODO_MESSAGES.SUCCESS,
      content: todo,
    };
  } catch {
    return { type: "Error", message: INTERNAL_SERVER_ERROR_MESSAGE };
  }
});

export const updateTodoCompleted = createAction(
  async (params: Pick<Todo, "id" | "completed">) => {
    try {
      await db
        .update(todoTable)
        .set({ completed: params.completed })
        .where(eq(todoTable.id, params.id));
      return { type: "Success", message: "Todo updated successfully." };
    } catch {
      return { type: "Error", message: INTERNAL_SERVER_ERROR_MESSAGE };
    }
  },
);
