import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { createdAt, id } from "@workspace/drizzle";

import { userId } from "./schemas";

export const usersTable = pgTable(
  "users",
  {
    id: id().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: varchar("image", { length: 255 }),
    createdAt,
  },
  (user) => ({
    emailIdx: uniqueIndex("email_idx").on(user.email),
  }),
);

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  accounts: many(accountsTable),
}));

export const accountsTable = pgTable(
  "accounts",
  {
    type: varchar("type", { length: 255 })
      .$type<"oauth" | "oidc" | "email" | "webauthn">()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
    userId,
    createdAt,
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsTableRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}));

export const sessionsTable = pgTable("sessions", {
  sessionToken: varchar("session_token", { length: 255 })
    .notNull()
    .primaryKey(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  userId,
  createdAt,
});

export const sessionsTableRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const verificationTokensTable = pgTable(
  "verificationTokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    createdAt,
  },
  (token) => ({
    compoundKey: primaryKey({ columns: [token.identifier, token.token] }),
  }),
);
