import type { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up - acme",
};

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h1 className="w-full text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-foreground/50">
          Hi there! We can't wait to get you up and running.
        </p>
      </div>
      <SignUpForm />
      <Link href="/signin" className="text-center text-sm text-blue-500">
        Already have an account?
      </Link>
    </>
  );
}
