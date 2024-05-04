import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { listTable, todoTable } from "./tables";

export type List = InferSelectModel<typeof listTable>;
export type InsertList = InferInsertModel<typeof listTable>;

export type Todo = InferSelectModel<typeof todoTable>;
export type InsertTodo = InferInsertModel<typeof todoTable>;
