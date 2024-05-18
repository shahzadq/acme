"use server";

// import { signIn as WebAuthSignIn } from "@workspace/web-auth";
import { signIn as webAuthSignIn } from "@workspace/web-auth";

export const signIn = async ({ email }: { email: string }) => {
  try {
    await webAuthSignIn("nodemailer", { email, redirect: false });

    return {
      type: "Success",
      message: "Authenticated",
    } as const;
  } catch {
    return {
      type: "Error",
      message: "Something went wrong.",
    } as const;
  }
};
