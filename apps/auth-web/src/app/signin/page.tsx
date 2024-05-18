import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <h1 className="w-full text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-foreground/50">
          We'll send you a link to sign in.
        </p>
      </div>
      <SignInForm />
    </>
  );
}
