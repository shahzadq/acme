"use server";

import { db, todoTable } from "@workspace/db-todos";

export async function createTodo() {
  await db.insert(todoTable).values({ description: "hello", listId: 1 });
}
