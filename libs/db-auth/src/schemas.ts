import { timestamp, varchar } from "drizzle-orm/pg-core";

export const id = (column = "id") => varchar(column, { length: 255 }).notNull();

export const userId = id("user_id");
export const createdAt = timestamp("created_at").defaultNow().notNull();

const t = () => {};
