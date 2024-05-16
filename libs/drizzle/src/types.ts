import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";

export type IncludeRelation<
  S extends Record<string, unknown>,
  TableName extends keyof ExtractTablesWithRelations<S>,
> = DBQueryConfig<
  "one" | "many",
  boolean,
  ExtractTablesWithRelations<S>,
  ExtractTablesWithRelations<S>[TableName]
>["with"];

export type InferResultType<
  S extends Record<string, unknown>,
  TableName extends keyof ExtractTablesWithRelations<S>,
  With extends
    | IncludeRelation<S, keyof ExtractTablesWithRelations<S>>
    | undefined = undefined,
> = BuildQueryResult<
  ExtractTablesWithRelations<S>,
  ExtractTablesWithRelations<S>[TableName],
  {
    with: With;
  }
>;
