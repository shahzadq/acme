"use client";

import { useState } from "react";
import { z } from "zod";

import { MailSearchIcon } from "@workspace/web-ui/components/Icons";

import { signUp } from "@/actions/auth";
import { AuthForm } from "./AuthForm";

export const SignUpForm = () => {
  const [successMessage, setSuccessMessage] = useState<{
    email: string;
    name: string;
  }>();

  if (typeof successMessage !== "undefined")
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-blue-100 p-8 text-center text-sm text-black">
        <MailSearchIcon className="text-blue-500" />
        <div className="flex flex-col gap-y-1">
          <b className="text-blue-500">Hi {successMessage.name}.</b>
          <span>
            We've sent a link to{" "}
            <b className="text-blue-500">{successMessage.email}</b>. Click it to
            continue.
          </span>
        </div>
        <span className="w-3/4 text-xs opacity-75">
          Remember to check your spam folder. You can close this page now.
        </span>
      </div>
    );

  return (
    <AuthForm
      validator={z.object({
        name: z
          .string()
          .min(2, { message: "Name should be at least 2 characters long" })
          .max(50, { message: "Name can't exceed 50 characters" }),
        email: z
          .string()
          .email({ message: "That email doesn't look quite right" }),
      })}
      inputs={{
        name: { type: "text", placeholder: "Name", errorCategory: "Name" },
        email: {
          type: "email",
          placeholder: "Email Address",
          errorCategory: "Email Address",
        },
      }}
      onSubmit={async (values, { setError }) => {
        const result = await signUp(values);

        if (result.type === "Error") {
          if (result.message === "Email already registered") {
            setError(result.message, "email");
          } else setError(result.message);
        } else setSuccessMessage(values);
      }}
    />
  );
};
