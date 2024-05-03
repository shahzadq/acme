import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const listTable = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  isCustom: boolean("is_custom").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const listTableRelations = relations(listTable, ({ many }) => ({
  todos: many(todoTable),
}));

export type List = InferSelectModel<typeof listTable>;
export type InsertList = InferInsertModel<typeof listTable>;

export const todoTable = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    description: varchar("description", { length: 256 }).notNull(),
    listId: integer("list_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (list) => ({
    ilstIdIdx: index("list_id_idx").on(list.listId),
  }),
);

export const todoTableRelations = relations(todoTable, ({ one }) => ({
  list: one(listTable, {
    fields: [todoTable.listId],
    references: [listTable.id],
  }),
}));

export type Todo = InferSelectModel<typeof todoTable>;
export type InsertTodo = InferInsertModel<typeof todoTable>;
