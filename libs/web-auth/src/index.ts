import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const { handlers, auth: defaultAuth, signIn, signOut } = NextAuth(authConfig);

const auth: ReturnType<typeof NextAuth>["auth"] = defaultAuth;

export { handlers, signIn, signOut, auth };
