import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const listSchema = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  isCustom: boolean("is_custom").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const listSchemaRelations = relations(listSchema, ({ many }) => ({
  todos: many(todoSchema),
}));

export type List = InferSelectModel<typeof listSchema>;

export const todoSchema = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    description: varchar("description", { length: 256 }).notNull(),
    listId: integer("list_id").notNull(),
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

export type Todo = InferSelectModel<typeof todoSchema>;
