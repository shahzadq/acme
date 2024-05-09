import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
  InferInsertModel,
  InferSelectModel,
} from "drizzle-orm";

import type { listTable, todoTable } from "./tables";
import type * as schema from "./tables";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type List = InferSelectModel<typeof listTable>;
export type InsertList = InferInsertModel<typeof listTable>;

export type Todo = InferSelectModel<typeof todoTable>;
export type InsertTodo = InferInsertModel<typeof todoTable>;

export type ListWithTodos = InferResultType<"listTable", { todos: true }>;
export type TodoWithList = InferResultType<"todoTable", { list: true }>;
