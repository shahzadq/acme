import type { InferResultType } from "@workspace/drizzle/types";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type * as schema from "./tables";

export type User = InferSelectModel<typeof schema.usersTable>;
export type InsertUser = InferInsertModel<typeof schema.usersTable>;

export type Account = InferSelectModel<typeof schema.accountsTable>;
export type InsertAccount = InferInsertModel<typeof schema.accountsTable>;

export type Session = InferSelectModel<typeof schema.sessionsTable>;
export type InsertSession = InferInsertModel<typeof schema.sessionsTable>;

export type VerificationToken = InferSelectModel<
  typeof schema.verificationTokensTable
>;
export type InsertVerificationToken = InferInsertModel<
  typeof schema.verificationTokensTable
>;

export type UserWithAccounts = InferResultType<
  typeof schema,
  "usersTable",
  { accounts: true }
>;
