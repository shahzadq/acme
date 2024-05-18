import type { DefaultSession, NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { render } from "@react-email/render";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";

import { db } from "@workspace/db-auth";
import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from "@workspace/db-auth/tables";

import { env } from "../env";
import SignInRequestEmail from "./emails/SignInRequest";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    verificationTokensTable,
  }) as Adapter,
  providers: [
    Nodemailer({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: "auth@acme.com",
      sendVerificationRequest: async ({ url, provider, identifier }) => {
        const transport = createTransport(provider.server);

        const emailHtml = render(SignInRequestEmail({ href: url }));
        const emailText = render(SignInRequestEmail({ href: url }), {
          plainText: true,
        });

        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `acme Sign In request`,
          text: emailText,
          html: emailHtml,
        });

        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/signIn",
  },
} satisfies NextAuthConfig;
