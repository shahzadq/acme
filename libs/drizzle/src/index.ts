import { timestamp, varchar } from "drizzle-orm/pg-core";

export const id = (column = "id") => varchar(column, { length: 255 }).notNull();

export const createdAt = timestamp("created_at").defaultNow().notNull();
