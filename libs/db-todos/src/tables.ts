import { relations } from "drizzle-orm";
import { boolean, index, pgTable, varchar } from "drizzle-orm/pg-core";

import { userId } from "@workspace/db-auth/schemas";
import { createdAt, id } from "@workspace/drizzle";

export const listTable = pgTable(
  "lists",
  {
    id: id().primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    userId,
    createdAt,
  },
  (list) => ({
    userIdIdx: index("user_id_idx").on(list.userId),
  }),
);

export const listTableRelations = relations(listTable, ({ many }) => ({
  todos: many(todoTable),
}));

export const todoTable = pgTable(
  "todos",
  {
    id: id().primaryKey(),
    description: varchar("description", { length: 256 }).notNull(),
    completed: boolean("completed").default(false).notNull(),
    listId: id("list_id"),
    userId,
    createdAt,
  },
  (todo) => ({
    userIdIdx: index("user_id_idx").on(todo.userId),
    listIdIdx: index("list_id_idx").on(todo.listId),
  }),
);

export const todoTableRelations = relations(todoTable, ({ one }) => ({
  list: one(listTable, {
    fields: [todoTable.listId],
    references: [listTable.id],
  }),
}));
