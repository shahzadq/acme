"use server";

import { db } from "@workspace/db-todos";
import { todoTable } from "@workspace/db-todos/schema";

export async function createTodo() {
  await db.insert(todoTable).values({ description: "hello", listId: 1 });
}
