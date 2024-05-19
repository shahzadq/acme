"use server";

import type { InsertUser } from "@workspace/db-auth/types";

import { db } from "@workspace/db-auth";
import { usersTable } from "@workspace/db-auth/tables";

// import { signIn as webAuthSignIn } from "@workspace/web-auth";

// export const signIn = async ({ email }: { email: string }) => {
//   try {
//     await webAuthSignIn("nodemailer", { email, redirect: false });

//     return {
//       type: "Success",
//       message: "Authenticated",
//     } as const;
//   } catch {
//     return {
//       type: "Error",
//       message: "Something went wrong.",
//     } as const;
//   }
// };

export const signUp = async (params: InsertUser) => {
  try {
    params = { ...params, email: params.email.toLowerCase() };

    const match = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.email, params.email),
    });

    if (typeof match !== "undefined")
      return { type: "Error", message: "Email already registered" } as const;

    const results = await db.insert(usersTable).values(params).returning();

    if (results.length === 0 || typeof results[0] === "undefined")
      throw new Error("Insert failed");

    return {
      type: "Success",
      message: "User created successfully",
      content: results[0],
    } as const;
  } catch {
    return {
      type: "Error",
      message: "Something went wrong",
    } as const;
  }
};
