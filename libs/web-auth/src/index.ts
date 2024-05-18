import NextAuth from "next-auth";

import { authConfig } from "./config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

export {
  signIn as clientSignIn,
  signOut as clientSignOut,
} from "next-auth/react";
