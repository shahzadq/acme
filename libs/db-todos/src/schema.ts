import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const listSchema = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const listSchemaRelations = relations(listSchema, ({ many }) => ({
  todos: many(todoSchema),
}));

export const todoSchema = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    description: varchar("description", { length: 256 }).notNull(),
    listId: serial("list_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (list) => ({
    ilstIdIdx: index("list_id_idx").on(list.listId),
  }),
);

export const todoSchemaRelations = relations(todoSchema, ({ one }) => ({
  list: one(listSchema, {
    fields: [todoSchema.listId],
    references: [listSchema.id],
  }),
}));
