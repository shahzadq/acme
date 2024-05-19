import type { Metadata } from "next";

import { AuthFormHeading } from "@/components/AuthFormHeading";
import { AuthFormLink } from "@/components/AuthFormLink";
import { SignInForm } from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In - acme",
};

export default function SignInPage() {
  return (
    <>
      <AuthFormHeading title="Sign In" description="Let's get you signed in." />
      <SignInForm />
      <AuthFormLink href="/signup">Create account</AuthFormLink>
    </>
  );
}
