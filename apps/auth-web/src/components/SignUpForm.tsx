"use client";

import { useState } from "react";
import { z } from "zod";

import { signUp } from "@/actions/auth";
import { email } from "@/schemas/authForm";
import { AuthForm } from "./AuthForm";
import { EmailSent } from "./EmailSent";

export const SignUpForm = () => {
  const [submitted, setSubmitted] = useState<{
    email: string;
    name?: string;
  }>();

  if (typeof submitted !== "undefined")
    return <EmailSent email={submitted.email} />;

  return (
    <AuthForm
      validator={z.object({
        name: z
          .string()
          .min(2, { message: "Name should be at least 2 characters long" })
          .max(50, { message: "Name can't exceed 50 characters" })
          .optional(),
        email,
      })}
      inputs={{
        name: {
          type: "text",
          placeholder: "Name (optional)",
          errorCategory: "Name",
        },
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
        } else setSubmitted(values);
      }}
    />
  );
};
