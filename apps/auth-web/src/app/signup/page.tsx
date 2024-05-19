import type { Metadata } from "next";

import { AuthFormHeading } from "@/components/AuthFormHeading";
import { AuthFormLink } from "@/components/AuthFormLink";
import { SignUpForm } from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up - acme",
};

export default function SignUpPage() {
  return (
    <>
      <AuthFormHeading
        title="Sign Up"
        description="Hi there! We can't wait to get you up and running."
      />
      <SignUpForm />
      <AuthFormLink href="/signin">Already have an account?</AuthFormLink>
    </>
  );
}
