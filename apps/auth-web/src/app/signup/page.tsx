import type { Metadata } from "next";

import { SignInForm } from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign Up - acme",
};

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h1 className="w-full text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-foreground/50">
          We'll send you a link to sign in.
        </p>
      </div>
      <SignInForm />
    </>
  );
}
