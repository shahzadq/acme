"use client";

import { useState } from "react";
import { z } from "zod";

import { email } from "@/schemas/authForm";
import { AuthForm } from "./AuthForm";
import { EmailSent } from "./EmailSent";

export const SignInForm = () => {
  const [submitted, setSubmitted] = useState<{ email: string }>();

  if (typeof submitted !== "undefined")
    return <EmailSent email={submitted.email} />;

  return (
    <AuthForm
      validator={z.object({
        email,
      })}
      inputs={{
        email: {
          type: "email",
          placeholder: "Email Address",
        },
      }}
      onSubmit={(values) => {
        setSubmitted(values);
      }}
    />
  );
};
