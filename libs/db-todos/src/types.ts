import type { InferResultType } from "@workspace/drizzle/types";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type * as schema from "./tables";

export type List = InferSelectModel<typeof schema.listTable>;
export type InsertList = InferInsertModel<typeof schema.listTable>;

export type Todo = InferSelectModel<typeof schema.todoTable>;
export type InsertTodo = InferInsertModel<typeof schema.todoTable>;

export type ListWithTodos = InferResultType<
  typeof schema,
  "listTable",
  { todos: true }
>;
export type TodoWithList = InferResultType<
  typeof schema,
  "todoTable",
  { list: true }
>;
