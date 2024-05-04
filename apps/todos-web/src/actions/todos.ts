"use server";

import type { InsertTodo } from "@workspace/db-todos/tables";

import { db } from "@workspace/db-todos";
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
