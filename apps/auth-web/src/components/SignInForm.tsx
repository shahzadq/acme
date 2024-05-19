"use client";

import { useState } from "react";
import { z } from "zod";

import { AuthForm } from "./AuthForm";
import { EmailSent } from "./EmailSent";

export const SignInForm = () => {
  const [submitted, setSubmitted] = useState<{ email: string }>();

  if (typeof submitted !== "undefined")
    return <EmailSent email={submitted.email} />;

  return (
    <AuthForm
      validator={z.object({
        email: z
          .string({ message: "We need an email to continue" })
          .email({ message: "That email doesn't look quite right" }),
      })}
      inputs={{
        email: {
          type: "email",
          placeholder: "Email Address",
          errorCategory: "Email Address",
        },
      }}
      onSubmit={(values) => {
        setSubmitted(values);
      }}
    />
  );
};
